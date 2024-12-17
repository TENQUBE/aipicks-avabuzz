import { PropsWithChildren, useEffect, useRef, useState } from 'react'

import {
  AdCode,
  ADPOPCORN_AOS_APP_KEY,
  ADPOPCORN_AOS_BANNER_320X50_1,
  ADPOPCORN_IOS_APP_KEY,
  ADPOPCORN_IOS_BANNER_320X50_1,
  ANIMATION_DURATION
} from '../../config'
import isIos from '../../utils/isIos'
import { useFlow } from '@/app/shared/libs/stackflow'
import AdpopcornBannerAd from '../AdpopcornBannerAd'
import { useActiveActivities } from '@/app/shared/hooks/useActiveActivities'
import { useSetToastContent, useToastContentValue } from '../../hooks/useToastContent'
import { useIsLoadedAdpopcornScriptValue } from '../../hooks/useIsLoadedAdpopcornScript'
import * as styles from '@/app/shared/components/Layout/style.css'

interface LayoutProps {
  title?: string
  backgroundColor?: string
  hasTopBar?: boolean
}

export default function Layout({
  children,
  title,
  backgroundColor = '#fff',
  hasTopBar = true
}: PropsWithChildren<LayoutProps>) {
  const { pop } = useFlow()

  const activeActivies = useActiveActivities()
  const toastContent = useToastContentValue()
  const setToastContent = useSetToastContent()
  const isLoadedAdpopcornScript = useIsLoadedAdpopcornScriptValue()

  const [adpopcornAppkey, setAdpopcornAppKey] = useState<string | null>(null)
  const [adpopcornAdCode, setAdpopcornAdCode] = useState<AdCode | null>(null)

  const toastAreaElRef = useRef<HTMLDivElement>(null)

  function handleClickBackButton() {
    pop()
  }

  useEffect(() => {
    if (isLoadedAdpopcornScript) {
      const appKey = isIos() ? ADPOPCORN_IOS_APP_KEY : ADPOPCORN_AOS_APP_KEY
      const adCode = isIos() ? ADPOPCORN_IOS_BANNER_320X50_1 : ADPOPCORN_AOS_BANNER_320X50_1

      setAdpopcornAppKey(appKey)
      setAdpopcornAdCode(adCode)
    }
  }, [isLoadedAdpopcornScript])

  useEffect(() => {
    if (!toastContent) return

    setTimeout(() => {
      if (!toastAreaElRef.current || !toastContent) return

      toastAreaElRef.current.classList.remove('close')
      toastAreaElRef.current.classList.add('open')
    }, ANIMATION_DURATION)

    setTimeout(() => {
      if (!toastAreaElRef.current || !toastContent) return

      toastAreaElRef.current.classList.remove('open')
      toastAreaElRef.current.classList.add('close')

      toastAreaElRef.current.addEventListener(
        'animationend',
        (event: AnimationEvent) => {
          if (event.animationName === styles.toastClose && toastContent) {
            setToastContent('')
          }
        },
        { once: true }
      )
    }, ANIMATION_DURATION + 2000)
  }, [toastContent])

  return (
    <div className={styles.area} style={{ backgroundColor }}>
      {title && hasTopBar && (
        <div className={styles.topBar} style={{ backgroundColor }}>
          {activeActivies.length > 1 && (
            <button className={styles.backButton} onClick={handleClickBackButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M20.8 20.95C20.5 20.95 20.2 20.85 20 20.55L12.5 13.05C12 12.55 12 11.85 12.5 11.35L20 3.85001C20.5 3.35001 21.2 3.35001 21.7 3.85001C22.2 4.35001 22.2 5.05001 21.7 5.55001L14.9 12.25L21.6 18.95C22.1 19.45 22.1 20.15 21.6 20.65C21.4 20.85 21.1 20.95 20.8 20.95Z"
                  fill="#121212"
                />
              </svg>
            </button>
          )}
          <h1 className={styles.title}>{title}</h1>
        </div>
      )}
      <div className={`${styles.content} ${hasTopBar ? 'hasTopBar' : ''}`}>{children}</div>
      <div className={styles.toastArea} ref={toastAreaElRef}>
        {toastContent}
      </div>
      <div className={styles.bottomAdBannerArea}>
        {isLoadedAdpopcornScript !== null && adpopcornAdCode && adpopcornAppkey && (
          <AdpopcornBannerAd appKey={adpopcornAppkey} adCode={adpopcornAdCode} />
        )}
      </div>
    </div>
  )
}
