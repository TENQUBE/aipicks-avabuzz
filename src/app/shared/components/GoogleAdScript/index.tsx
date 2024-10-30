'use client'

import Script from 'next/script'

import { useSetGoogleAdsenseScriptLoadStatus } from '@/app/shared/hooks/useGoogleAdScriptLoadStatus'

export default function GoogleAdScript() {
  const setGoogleAdsenseScriptLoadStatus = useSetGoogleAdsenseScriptLoadStatus()

  return (
    <Script
      async
      type="text/javascript"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4440358116924496"
      crossOrigin="anonymous"
      onLoad={() => {
        setGoogleAdsenseScriptLoadStatus('resolved')
      }}
      onError={() => {
        setGoogleAdsenseScriptLoadStatus('rejected')
      }}
    />
  )
}
