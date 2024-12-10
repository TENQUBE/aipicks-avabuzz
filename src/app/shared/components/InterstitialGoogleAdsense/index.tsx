import { useRef, AnimationEvent } from 'react'

import GoogleAdsense from '@/app/shared/components/GoogleAdsense'
import * as styles from '@/app/shared/components/InterstitialGoogleAdsense/style.css'

interface InterstitialGoogleAdsenseProps {
  closeCallback: Function
}

export default function InterstitialGoogleAdsense({
  closeCallback
}: InterstitialGoogleAdsenseProps) {
  const dimElRef = useRef<HTMLDivElement>(null)
  const contentElRef = useRef<HTMLDivElement>(null)

  function handleAnimationEndDimEl(event: AnimationEvent) {
    if (event.animationName.includes(styles.fadeOut)) {
      closeCallback()
    }
  }

  function handleClickCloseButton() {
    if (!dimElRef.current || !contentElRef.current) return

    dimElRef.current.classList.add('close')
    contentElRef.current.classList.add('close')
  }

  return (
    <>
      <div className={styles.dim} ref={dimElRef} onAnimationEnd={handleAnimationEndDimEl} />
      <div className={styles.content} ref={contentElRef}>
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
        <GoogleAdsense type="interstitial" />
      </div>
    </>
  )
}
