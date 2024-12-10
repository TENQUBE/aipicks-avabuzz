'use client'

import { useEffect, useRef } from 'react'

import { CLIENT_ID, GOLDBOX_URL, SLOT } from '@/app/shared/config'
import { useIsLoadedGoogleAdsenseScriptValue } from '@/app/shared/hooks/useIsLoadedGoogleAdSenseScript'
import * as styles from '@/app/shared/components/GoogleAdsense/style.css'
import { useIsAdBlock } from '../../hooks/useIsAdBlock'

declare global {
  interface Window {
    adsbygoogle: any
  }
}

interface GoogleAdsenseProps {
  type: 'floating' | 'banner' | 'modal' | 'interstitial'
}

function getDefaultAdInfo(type: 'floating' | 'banner' | 'modal' | 'interstitial') {
  switch (type) {
    case 'interstitial':
      return { src: '/images/ad/coupang-interstitial.png', width: 600, height: 960 }
    case 'floating':
      return { src: '/images/ad/coupang-floating.png', width: 1125, height: 156 }
    case 'modal':
      return { src: '/images/ad/coupang-modal.png', width: 240, height: 220 }
    default:
      // banner
      return { src: '/images/ad/coupang-banner.png', width: 640, height: 300 }
  }
}

export default function GoogleAdsense({ type }: GoogleAdsenseProps) {
  const isLoaded = useIsLoadedGoogleAdsenseScriptValue()
  const isAdBlock = useIsAdBlock()

  const googleAdElRef = useRef<HTMLModElement>(null)
  const defaultAdElRef = useRef<HTMLAnchorElement>(null)

  const { src: adImgSrc, width: adImgWidth, height: adImgHeight } = getDefaultAdInfo(type)

  useEffect(() => {
    if (isLoaded === null || isAdBlock === null) return

    if (isLoaded && !isAdBlock) {
      if (typeof window.adsbygoogle === 'undefined' && defaultAdElRef.current) {
        defaultAdElRef.current!.style.display = 'block'
      } else {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } else {
      defaultAdElRef.current!.style.display = 'block'
    }
  }, [isLoaded, isAdBlock])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (googleAdElRef.current && defaultAdElRef.current) {
        if (googleAdElRef.current.dataset.adStatus === 'unfilled') {
          defaultAdElRef.current.style.display = 'block'
        } else {
          defaultAdElRef.current.style.display = 'none'
        }
      }
    })

    if (googleAdElRef.current) {
      observer.observe(googleAdElRef.current, {
        attributes: true,
        attributeFilter: ['data-ad-status']
      })
    }
  }, [])

  return (
    <div className={styles.area}>
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
      <a
        className={styles.goldboxArea}
        ref={defaultAdElRef}
        href={GOLDBOX_URL}
        target="_blank"
        referrerPolicy="unsafe-url"
      >
        <img
          className={`${styles.goldbox} ${type === 'floating' ? 'overwrap' : ''}`}
          loading="eager"
          src={adImgSrc}
          alt="광고 이미지"
          width={adImgWidth}
          height={adImgHeight}
        />
      </a>
    </div>
  )
}
