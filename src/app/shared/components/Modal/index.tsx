import {
  MouseEvent,
  ReactNode,
  useCallback,
  useRef,
  AnimationEvent,
  useEffect,
  PropsWithChildren
} from 'react'
import { useActivity } from '@stackflow/react'

import { useFlow } from '@/app/shared/libs/stackflow'
import GoogleAdsense from '@/app/shared/components/GoogleAdsense'
import * as styles from '@/app/shared/components/Modal/style.css'

interface ModalProps {
  children: ReactNode
  closeModalCallback?: Function
}

export default function Modal({ children, closeModalCallback }: PropsWithChildren<ModalProps>) {
  const activity = useActivity()
  const { pop } = useFlow()

  const dimElRef = useRef<HTMLDivElement>(null)
  const contentElRef = useRef<HTMLDivElement>(null)

  const handleClickDim = useCallback(() => {
    if (!dimElRef.current || !contentElRef.current) return

    dimElRef.current.classList.add('close')
    contentElRef.current.classList.add('close')
  }, [])

  const handleAnimationEndDimEl = useCallback(
    (e: AnimationEvent) => {
      if (e.animationName.includes(styles.fadeOut) && activity.transitionState !== 'exit-active') {
        closeModalCallback?.() ?? pop()
      }
    },
    [activity]
  )

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
      <div
        className={styles.dim}
        ref={dimElRef}
        onClick={() => {
          handleClickDim()
        }}
        onAnimationEnd={handleAnimationEndDimEl}
      />
      <section
        className={styles.contentArea}
        ref={contentElRef}
        onClick={(event: MouseEvent) => {
          event.stopPropagation()
        }}
      >
        {children}
      </section>

      <div className={styles.bottomAdBannerArea}>
        <GoogleAdsense type="floating" />
      </div>
    </>
  )
}
