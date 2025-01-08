import { useSearchParams } from 'next/navigation'
import { PropsWithChildren, useCallback, useEffect } from 'react'
import { Activity } from '@stackflow/core'

import { useSetDeviceId } from '../../hooks/useDeviceId'
import { useIsAdBlock, useSetIsAdBlock } from '../../hooks/useIsAdBlock'
import { useSetDefaultAdType, useSetIsSeeCoupang } from '../../hooks/useCoupangAd'
import * as styles from './style.css'

interface StackWrapperProps {
  activities: Activity[]
}

export default function StackWrapper({
  activities,
  children
}: PropsWithChildren<StackWrapperProps>) {
  const searchParams = useSearchParams()

  const setDeviceId = useSetDeviceId()
  const isAdBlock = useIsAdBlock()
  const setIsAdBlock = useSetIsAdBlock()
  const setIsSeeCoupang = useSetIsSeeCoupang()
  const setDefaultAdType = useSetDefaultAdType()

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
    const isSeeCoupang = searchParams.get('isSeeCoupang')
      ? searchParams.get('isSeeCoupang') === 'true'
      : true
    const isSeeFortuneCookie = searchParams.get('isSeeFortuneCookie')
      ? searchParams.get('isSeeFortuneCookie') === 'true'
      : true

    if (deviceId) setDeviceId(deviceId)

    setIsSeeCoupang(isSeeCoupang)
    setDefaultAdType(isSeeFortuneCookie ? 'fortuneCookie' : 'googleAdsense')
  }, [])

  useEffect(() => {
    if (typeof isAdBlock === 'boolean') return

    checkIsAdBlock()
  }, [isAdBlock, checkIsAdBlock])

  return <div className={styles.area}>{children}</div>
}
