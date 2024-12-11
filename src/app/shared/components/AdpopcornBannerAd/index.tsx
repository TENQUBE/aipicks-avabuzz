import { useCallback, useEffect, useRef, useState } from 'react'

import GoogleAdsense from '../GoogleAdsense'
import { useIsAdBlock } from '../../hooks/useIsAdBlock'
import { useIsLoadedAdpopcornScriptValue } from '../../hooks/useIsLoadedAdpopcornScript'
import * as styles from './style.css'

interface AdpopcornBannerAdProps {
  id: string
  type: string
  slotId?: string
  appKey: string
  placementId: string
  adClickCallback?: () => void
}

export default function AdpopcornBannerAd({
  id,
  type,
  slotId,
  appKey,
  placementId,
  adClickCallback
}: AdpopcornBannerAdProps) {
  const isLoaded = useIsLoadedAdpopcornScriptValue()
  const isAdBlock = useIsAdBlock()

  const [isShowGoogleAdSense, setIsShowGoogleAdSense] = useState<boolean>(false)

  const adAreaElRef = useRef<HTMLDivElement>(null)
  const isSetupGptRef = useRef<boolean>(false)
  const isSetupAdpopcornRef = useRef<boolean>(false)
  const slotRef = useRef<googletag.Slot | null>(null)
  const adElIdRef = useRef<string>(`${id}-${new Date().toISOString()}`)
  const iframeIdRef = useRef<string | null>(null)

  function getAdSize(type: string) {
    switch (type) {
      case 'banner_320X50':
        return { width: 320, height: 50 }
      case 'banner_320X100':
        return { width: 320, height: 100 }
      default:
        // banner_320X250
        return { width: 320, height: 250 }
    }
  }

  function getGoogleAdSenseType(type: string) {
    switch (type) {
      case 'banner_320X50':
        return 'floating'
      case 'banner_320X100':
        return 'banner'
      default:
        // banner_320X250
        return 'modal'
    }
  }

  const handleBlurWindow = useCallback(() => {
    setTimeout(() => {
      const activeEl = document.activeElement

      if (
        activeEl &&
        activeEl.tagName === 'IFRAME' &&
        activeEl.getAttribute('id') === iframeIdRef.current
      ) {
        console.log('adClicked', (activeEl as HTMLIFrameElement).dataset.clicked)

        adClickCallback?.()
      }
    })
  }, [adClickCallback])

  const setupAdpopcornBannerdAd = useCallback(
    (type: string, appKey: string, placementId: string, id: string) => {
      if (isSetupAdpopcornRef.current) return

      isSetupAdpopcornRef.current = true

      let banner: any

      switch (type) {
        case 'banner_320X50':
          banner = window.AdPopcornSSPWebSDK.createBannerSize320x50({
            app_key: appKey,
            placement_id: placementId
          })
          break
        case 'banner_300X250':
          banner = window.AdPopcornSSPWebSDK.createBannerSize300x250({
            app_key: appKey,
            placement_id: placementId
          })
          break
        default:
          // banner_320X100
          banner = window.AdPopcornSSPWebSDK.createBannerSize320x100({
            app_key: appKey,
            placement_id: placementId
          })
      }

      // SDK 연동 실패
      banner.addEventListener('sdkError', (event: any) => {
        // SDK 연동 실패시, 이벤트 처리
        console.log('sdkError', event.message)
        setIsShowGoogleAdSense(true)
      })

      // 광고 렌더링 결과
      banner.addEventListener('adInventoryRendered', (event: any) => {
        // 광고 렌더링 결과에 따른 이벤트 처리
        if (event.isNoAd) {
          // TODO: no ad 처리
          console.log('no ad', id)
          setIsShowGoogleAdSense(true)
        } else {
          const iframeEl = adAreaElRef.current?.querySelector('iframe')

          if (iframeEl) {
            iframeIdRef.current = iframeEl.getAttribute('id')
          }
        }
      })

      // 광고 클릭
      banner.addEventListener('adClicked', () => {
        // 광고 클릭시, 이벤트 처리
        // console.log('adClicked')
      })

      banner.display(id)
    },
    []
  )

  const setupGoogleBannerAd = useCallback(
    (type: string, id: string, slotId: string, appKey: string, placementId: string) => {
      if (isSetupGptRef.current) return

      isSetupGptRef.current = true

      if (!(window.googletag as any)._loaded_) {
        // ad block
        console.log('ad block')
        setIsShowGoogleAdSense(true)
      } else {
        googletag.cmd.push(function () {
          let size: googletag.GeneralSize

          switch (type) {
            case 'banner_320X50':
              size = [320, 50]
              break
            case 'banner_300X250':
              size = [300, 250]
              break
            default:
              // banner_320X100
              size = [320, 100]
          }

          slotRef.current = googletag.defineSlot(slotId, size, id)

          if (slotRef.current) {
            slotRef.current.addService(googletag.pubads())

            googletag.pubads().addEventListener('slotRenderEnded', (event) => {
              if (event.slot !== slotRef.current) return

              if (event.isEmpty) {
                // 구글 스크립트 실행 결과, 광고가 없을 경우 애드팝콘 패스백 처리
                if (adAreaElRef.current) {
                  adAreaElRef.current.replaceChildren()
                }

                setupAdpopcornBannerdAd(type, appKey, placementId, id)
              } else {
                const iframeEl = adAreaElRef.current?.querySelector('iframe')

                if (iframeEl) {
                  iframeIdRef.current = iframeEl.getAttribute('id')
                }
              }
            })

            googletag.enableServices()
            googletag.display(slotRef.current)
          } else {
            setIsShowGoogleAdSense(true)
          }
        })
      }
    },
    [setupAdpopcornBannerdAd]
  )

  useEffect(() => {
    if (isAdBlock === null || isLoaded === null) return

    if (isLoaded && !isAdBlock) {
      if (slotId) {
        setupGoogleBannerAd(type, adElIdRef.current, slotId, appKey, placementId)
      } else {
        setupAdpopcornBannerdAd(type, appKey, placementId, adElIdRef.current)
      }
    } else {
      setIsShowGoogleAdSense(true)
    }
  }, [
    isAdBlock,
    isLoaded,
    setupGoogleBannerAd,
    setupAdpopcornBannerdAd,
    slotId,
    type,
    appKey,
    placementId
  ])

  useEffect(() => {
    return () => {
      if (!slotRef.current) return

      googletag.destroySlots([slotRef.current])
    }
  }, [])

  useEffect(() => {
    window.addEventListener('blur', handleBlurWindow)

    return () => {
      window.removeEventListener('blur', handleBlurWindow)
    }
  }, [handleBlurWindow])

  return (
    <div className={styles.area}>
      {!isShowGoogleAdSense ? (
        <div
          id={adElIdRef.current}
          ref={adAreaElRef}
          style={{
            minWidth: `${getAdSize(type).width}px`,
            minHeight: `${getAdSize(type).height}px`
          }}
        />
      ) : (
        <GoogleAdsense type={getGoogleAdSenseType(type)} adClickCallback={adClickCallback} />
      )}
    </div>
  )
}
