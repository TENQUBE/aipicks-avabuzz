import {
  MouseEvent,
  ReactNode,
  useCallback,
  useRef,
  AnimationEvent,
  useEffect,
  PropsWithChildren,
  useState
} from 'react'
import { useActivity } from '@stackflow/react'

import {
  AdCode,
  ADPOPCORN_AOS_APP_KEY,
  ADPOPCORN_AOS_BANNER_320X50_1,
  ADPOPCORN_IOS_APP_KEY,
  ADPOPCORN_IOS_BANNER_320X50_1
} from '../../config'
import isIos from '../../utils/isIos'
import { useFlow } from '@/app/shared/libs/stackflow'
import AdpopcornBannerAd from '../AdpopcornBannerAd'
import { useIsLoadedAdpopcornScriptValue } from '../../hooks/useIsLoadedAdpopcornScript'
import * as styles from '@/app/shared/components/Modal/style.css'

interface ModalProps {
  children: ReactNode
  isShowCloseButton?: boolean
  closeModalCallback?: Function
}

export default function Modal({
  children,
  isShowCloseButton = true,
  closeModalCallback
}: PropsWithChildren<ModalProps>) {
  const activity = useActivity()
  const { pop } = useFlow()

  const isLoadedAdpopcornScript = useIsLoadedAdpopcornScriptValue()

  const dimElRef = useRef<HTMLDivElement>(null)
  const contentElRef = useRef<HTMLDivElement>(null)

  const [adpopcornAppkey, setAdpopcornAppKey] = useState<string | null>(null)
  const [adpopcornAdCode, setAdpopcornAdCode] = useState<AdCode | null>(null)

  function handleClickCloseButton() {
    if (!dimElRef.current || !contentElRef.current) return

    dimElRef.current.classList.add('close')
    contentElRef.current.classList.add('close')
  }

  const handleAnimationEndDimEl = useCallback(
    (e: AnimationEvent) => {
      if (e.animationName.includes(styles.fadeOut) && activity.transitionState !== 'exit-active') {
        closeModalCallback?.() ?? pop()
      }
    },
    [activity]
  )

  useEffect(() => {
    if (isLoadedAdpopcornScript) {
      const appKey = isIos() ? ADPOPCORN_IOS_APP_KEY : ADPOPCORN_AOS_APP_KEY
      const adCode = isIos() ? ADPOPCORN_IOS_BANNER_320X50_1 : ADPOPCORN_AOS_BANNER_320X50_1

      setAdpopcornAppKey(appKey)
      setAdpopcornAdCode(adCode)
    }
  }, [isLoadedAdpopcornScript])

  useEffect(() => {
    if (!dimElRef.current || !contentElRef.current) return

    if (
      !dimElRef.current.classList.contains('close') &&
      !contentElRef.current.classList.contains('close') &&
      activity.transitionState === 'exit-active'
    ) {
      dimElRef.current.classList.add('close')
      contentElRef.current.classList.add('close')
    }
  }, [activity])

  return (
    <>
      <div className={styles.dim} ref={dimElRef} onAnimationEnd={handleAnimationEndDimEl} />

      <section
        className={styles.contentArea}
        ref={contentElRef}
        onClick={(event: MouseEvent) => {
          event.stopPropagation()
        }}
      >
        {isShowCloseButton && (
          <button className={styles.button} onClick={handleClickCloseButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M15.5745 4.43433C15.2294 4.08924 14.6719 4.08924 14.3268 4.43433L9.99996 8.75237L5.67307 4.42548C5.32798 4.0804 4.77053 4.0804 4.42544 4.42548C4.08035 4.77057 4.08035 5.32803 4.42544 5.67312L8.75233 10L4.42544 14.3269C4.08035 14.672 4.08035 15.2294 4.42544 15.5745C4.77053 15.9196 5.32798 15.9196 5.67307 15.5745L9.99996 11.2476L14.3268 15.5745C14.6719 15.9196 15.2294 15.9196 15.5745 15.5745C15.9196 15.2294 15.9196 14.672 15.5745 14.3269L11.2476 10L15.5745 5.67312C15.9107 5.33687 15.9107 4.77057 15.5745 4.43433Z"
                fill="#F9F9F9"
              />
            </svg>
            닫기
          </button>
        )}
        {children}
      </section>

      <div className={styles.bottomAdBannerArea}>
        {isLoadedAdpopcornScript !== null && adpopcornAdCode && adpopcornAppkey && (
          <AdpopcornBannerAd
            id={adpopcornAdCode.id}
            type={adpopcornAdCode.type}
            appKey={adpopcornAppkey}
            placementId={adpopcornAdCode.placementId}
          />
        )}
      </div>
    </>
  )
}
