'use client'

import Script from 'next/script'

import { CLIENT_ID } from '../../config'
import { useSetIsLoadedGoogleAdsenseScript } from '@/app/shared/hooks/useIsLoadedGoogleAdSenseScript'

export default function GoogleAdScript() {
  const setIsLoadedGoogleAdsenseScript = useSetIsLoadedGoogleAdsenseScript()

  return (
    <Script
      async
      type="text/javascript"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT_ID}`}
      crossOrigin="anonymous"
      onLoad={() => {
        setIsLoadedGoogleAdsenseScript(true)
      }}
      onError={() => {
        setIsLoadedGoogleAdsenseScript(false)
      }}
    />
  )
}
