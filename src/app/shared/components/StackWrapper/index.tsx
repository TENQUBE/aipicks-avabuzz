import { useSearchParams } from 'next/navigation'
import { PropsWithChildren, useCallback, useEffect } from 'react'
import { Activity } from '@stackflow/core'

import { useSetDeviceId } from '../../hooks/useDeviceId'
import { useIsAdBlock, useSetIsAdBlock } from '../../hooks/useIsAdBlock'
import * as styles from './style.css'

interface StackWrapperProps {
  activities: Activity[]
}

export default function StackWrapper({ children }: PropsWithChildren<StackWrapperProps>) {
  const searchParams = useSearchParams()

  const setDeviceId = useSetDeviceId()
  const isAdBlock = useIsAdBlock()
  const setIsAdBlock = useSetIsAdBlock()

  const checkIsAdBlock = useCallback(async () => {
    try {
      const controller = new AbortController()
      const timerId = setTimeout(() => {
        controller.abort()
      }, 3000)

      await fetch('https://securepubads.g.doubleclick.net/tag', {
        mode: 'no-cors',
        signal: controller.signal
      })

      clearTimeout(timerId)
      setIsAdBlock(false)
    } catch (error) {
      setIsAdBlock(true)
    }
  }, [])

  useEffect(() => {
    const deviceId = searchParams.get('deviceId')

    if (deviceId) {
      setDeviceId(deviceId)
    }
  }, [])

  useEffect(() => {
    if (typeof isAdBlock === 'boolean') return

    checkIsAdBlock()
  }, [isAdBlock, checkIsAdBlock])

  return <div className={styles.area}>{children}</div>
}
