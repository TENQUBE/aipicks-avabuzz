'use client'

import Script from 'next/script'
import { useCallback, useEffect, useRef, useState } from 'react'

import {
  ADPOPCORN_AOS_AD_CODE_LIST,
  ADPOPCORN_IOS_AD_CODE_LIST,
  ADPOPCORN_IOS_APP_KEY,
  ADPOPCORN_AOS_APP_KEY
} from '@/app/shared/config'
import isIos from '@/app/shared/utils/isIos'
import { useSetIsLoadedAdpopcornScript } from '@/app/shared/hooks/useIsLoadedAdpopcornScript'
import { useDeviceIdValue } from '@/app/shared/hooks/useDeviceId'

declare global {
  interface Window {
    AdPopcornSSPWebSDK: any
  }
}

export default function AdpopcornAdScript() {
  const deviceId = useDeviceIdValue()
  const setIsLoadedAdpopcornScript = useSetIsLoadedAdpopcornScript()

  const [isGPTScriptLoaded, setIsGPTScriptLoaded] = useState<boolean | null>(null)
  const [isAdpopcornWebSDKScriptLoaded, setIsAdpopcornWebSDKScriptLoaded] = useState<
    boolean | null
  >(null)

  const isSetupAdpopcornConfigRef = useRef<boolean>(false)

  const setupAdpopcorn = useCallback((deviceId: string) => {
    if (isSetupAdpopcornConfigRef.current === true) return
    isSetupAdpopcornConfigRef.current = true

    window.googletag = window.googletag || { cmd: [] }
    window.AdPopcornSSPWebSDK = window.AdPopcornSSPWebSDK || { cmd: [] }

    // Prepare GPT to display ads.
    window.googletag.cmd.push(() => {
      window.googletag.pubads().set('page_url', 'tenqube.com')

      // Disable initial load, to precisely control when ads are requested.
      // googletag.pubads().disableInitialLoad()

      // Enable SRA and services.
      // googletag.pubads().enableSingleRequest()
      // googletag.enableServices()
    })

    window.AdPopcornSSPWebSDK.cmd.push(() => {
      if (isIos()) {
        ADPOPCORN_IOS_AD_CODE_LIST.forEach(({ placementId }) => {
          window.AdPopcornSSPWebSDK.init({
            app_key: ADPOPCORN_IOS_APP_KEY,
            placement_id: placementId,
            log_enabled: true
          })
        })

        window.AdPopcornSSPWebSDK.setConfig({
          idfa: deviceId
        })
      } else {
        ADPOPCORN_AOS_AD_CODE_LIST.forEach(({ placementId }) => {
          window.AdPopcornSSPWebSDK.init({
            app_key: ADPOPCORN_AOS_APP_KEY,
            placement_id: placementId,
            log_enabled: true
          })
        })

        window.AdPopcornSSPWebSDK.setConfig({
          adid: deviceId
        })
      }
    })
  }, [])

  useEffect(() => {
    if (!deviceId) return

    if (isGPTScriptLoaded && isAdpopcornWebSDKScriptLoaded) {
      setIsLoadedAdpopcornScript(true)

      setupAdpopcorn(deviceId)
    } else {
      setIsLoadedAdpopcornScript(false)
    }
  }, [deviceId, isGPTScriptLoaded, isAdpopcornWebSDKScriptLoaded, setupAdpopcorn])

  return (
    <>
      <Script
        async
        type="text/javascript"
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        onLoad={() => {
          setIsGPTScriptLoaded(true)
        }}
        onError={() => {
          setIsGPTScriptLoaded(false)
        }}
      />
      <Script
        async
        type="text/javascript"
        src="https://webapi.adpopcorn.com/ssp/web-sdk/ap-ssp-web-sdk-1.9.0.min.js"
        onLoad={() => {
          setIsAdpopcornWebSDKScriptLoaded(true)
        }}
        onError={() => {
          setIsAdpopcornWebSDKScriptLoaded(false)
        }}
      />
    </>
  )
}
