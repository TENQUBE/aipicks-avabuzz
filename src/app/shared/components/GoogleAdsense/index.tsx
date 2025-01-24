'use client'

import { useActivity } from '@stackflow/react'
import { useCallback, useEffect, useRef } from 'react'

import { CLIENT_ID, GOLDBOX_URL, SLOT } from '@/app/shared/config'
import isIos from '../../utils/isIos'
import { useStepFlow } from '../../libs/stackflow'
import { useIsLoadedGoogleAdsenseScriptValue } from '../../hooks/useIsLoadedGoogleAdSenseScript'
import { useIsAdBlock } from '../../hooks/useIsAdBlock'
import * as styles from './style.css'

declare global {
  interface Window {
    adsbygoogle: any
  }
}

interface GoogleAdsenseProps {
  type: 'floating' | 'banner' | 'modal' | 'interstitial'
  adClickCallback?: Function
}

function getDefaultAdInfo(type: 'floating' | 'banner' | 'modal' | 'interstitial') {
  switch (type) {
    case 'floating':
      return { src: '/images/ad/coupang-floating.png', width: 1125, height: 156 }
    case 'modal':
    case 'interstitial':
      return { src: '/images/ad/coupang-modal.png', width: 240, height: 220 }
    default:
      // banner
      return { src: '/images/ad/coupang-banner.png', width: 640, height: 300 }
  }
}

export default function GoogleAdsense({ type, adClickCallback }: GoogleAdsenseProps) {
  const activity = useActivity()

  const { pushStep } = useStepFlow(activity.name)
  const isLoaded = useIsLoadedGoogleAdsenseScriptValue()
  const isAdBlock = useIsAdBlock()

  const areaElRef = useRef<HTMLDivElement>(null)
  const googleAdElRef = useRef<HTMLModElement>(null)
  const defaultAdElRef = useRef<HTMLDivElement>(null)

  const { src: adImgSrc, width: adImgWidth, height: adImgHeight } = getDefaultAdInfo(type)

  // GoogleAdSense Click (IFRAME)
  const handleVisibilityChangeWindow = useCallback(() => {
    const activeEl = document.activeElement

    const isCurActivityHidden = activity.isTop && document.visibilityState === 'hidden'
    const isClickedAdIframe =
      activeEl &&
      activeEl.tagName === 'IFRAME' &&
      areaElRef.current &&
      areaElRef.current.contains(activeEl)

    if (isCurActivityHidden && isClickedAdIframe) {
      adClickCallback?.()

      if (!isIos()) {
        pushStep({ adClicked: true })
      }
    }
  }, [activity, adClickCallback])

  // DefaultAd Click
  function handleClickDefaultAd() {
    window.open(GOLDBOX_URL)

    adClickCallback?.()

    if (!isIos()) {
      pushStep({ adClicked: true })
    }
  }

  useEffect(() => {
    if (isLoaded === null || isAdBlock === null || !defaultAdElRef.current) return

    if (isLoaded && !isAdBlock) {
      if (typeof window.adsbygoogle === 'undefined') {
        console.log('default ad display block because adsbygoogle is undefined')
        defaultAdElRef.current.style.display = 'block'
      } else {
        console.log('adsbygoogle push')
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } else {
      console.log('default ad display block because ad blocked')
      defaultAdElRef.current.style.display = 'block'
    }
  }, [isLoaded, isAdBlock])

  useEffect(() => {
    if (googleAdElRef.current === null) return

    const observer = new MutationObserver(() => {
      if (googleAdElRef.current === null || defaultAdElRef.current === null) return

      console.log(
        'googleAdElRef.current.dataset.adStatus: ',
        googleAdElRef.current.dataset.adStatus
      )

      if (googleAdElRef.current.dataset.adStatus === 'unfilled') {
        defaultAdElRef.current.style.display = 'block'
      } else {
        defaultAdElRef.current.style.display = 'none'
      }
    })

    observer.observe(googleAdElRef.current, {
      attributes: true,
      attributeFilter: ['data-ad-status']
    })
  }, [])

  useEffect(() => {
    window.addEventListener('visibilitychange', handleVisibilityChangeWindow)

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChangeWindow)
    }
  }, [handleVisibilityChangeWindow])

  return (
    <div className={styles.area} ref={areaElRef}>
      <span className={styles.adText}>AD</span>
      <ins
        className={`adsbygoogle ${styles.googleAd} googleads`}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}
        ref={googleAdElRef}
        data-ad-client={CLIENT_ID}
        data-ad-slot={SLOT}
      />
      <div className={styles.goldboxArea} ref={defaultAdElRef} onClick={handleClickDefaultAd}>
        <img
          className={`${styles.goldbox} ${type === 'floating' ? 'overwrap' : ''}`}
          loading="eager"
          src={adImgSrc}
          alt="광고 이미지"
          width={adImgWidth}
          height={adImgHeight}
        />
      </div>
    </div>
  )
}
