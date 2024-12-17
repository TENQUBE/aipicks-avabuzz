import { useCallback, useEffect, useRef, useState } from 'react'

import { AdCode } from '../../config'
import GoogleAdsense from '../GoogleAdsense'
import FortuneCookieAd from '../FortuneCookieAd'
import { useIsAdBlock } from '../../hooks/useIsAdBlock'
import { useIsLoadedAdpopcornScriptValue } from '../../hooks/useIsLoadedAdpopcornScript'
import * as styles from './style.css'

interface AdpopcornBannerAdProps {
  appKey: string
  adCode: AdCode
  defaultAdType?: 'googleAdsense' | 'fortuneCookie'
  adClickCallback?: () => void
}

export default function AdpopcornBannerAd({
  appKey,
  adCode,
  defaultAdType = 'googleAdsense',
  adClickCallback
}: AdpopcornBannerAdProps) {
  const isLoaded = useIsLoadedAdpopcornScriptValue()
  const isAdBlock = useIsAdBlock()

  const [isShowDefaultAd, setIsShowDefaultAd] = useState<boolean>(false)

  const adAreaElRef = useRef<HTMLDivElement>(null)
  const isSetupGptRef = useRef<boolean>(false)
  const isSetupAdpopcornRef = useRef<boolean>(false)
  const slotRef = useRef<googletag.Slot | null>(null)
  const adElIdRef = useRef<string>(`${adCode.id}-${new Date().toISOString()}`)
  const iframeIdRef = useRef<string | null>(null)

  function getAdSize(type: string) {
    switch (type) {
      case 'banner_320X50':
        return [320, 50]
      case 'banner_320X100':
        return [320, 100]
      default:
        // native_300X250
        return [300, 250]
    }
  }

  function getGoogleAdSenseType(type: string) {
    switch (type) {
      case 'banner_320X50':
        return 'floating'
      case 'banner_320X100':
        return 'banner'
      default:
        // native_300X250
        return 'modal'
    }
  }

  function getFortuneCookieAdType(type: string) {
    switch (type) {
      case 'native_300X250':
        return 'modal'
      default:
        // banner_320X50
        // banner_320X100
        return 'banner'
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
    async (type: string, appKey: string, placementIds: string[], id: string) => {
      if (isSetupAdpopcornRef.current) return

      isSetupAdpopcornRef.current = true

      let banner: any

      for (let i = 0; i < placementIds.length; i++) {
        const result = await new Promise<boolean>((resolve) => {
          switch (type) {
            case 'banner_320X50':
              banner = window.AdPopcornSSPWebSDK.createBannerSize320x50({
                app_key: appKey,
                placement_id: placementIds[i]
              })
              break
            case 'banner_300X250':
              banner = window.AdPopcornSSPWebSDK.createBannerSize300x250({
                app_key: appKey,
                placement_id: placementIds[i]
              })
              break
            case 'banner_320X100':
              banner = window.AdPopcornSSPWebSDK.createBannerSize320x100({
                app_key: appKey,
                placement_id: placementIds[i]
              })
              break
            default:
              // native_300X250
              banner = window.AdPopcornSSPWebSDK.createNative({
                app_key: appKey,
                placement_id: placementIds[i]
              })
          }

          if (type !== 'native_300X250') {
            // SDK 연동 실패
            banner.addEventListener('sdkError', (event: any) => {
              // SDK 연동 실패시, 이벤트 처리
              console.log('sdkError', event.message)
              resolve(false)
            })

            // 광고 렌더링 결과
            banner.addEventListener('adInventoryRendered', (event: any) => {
              // 광고 렌더링 결과에 따른 이벤트 처리
              if (event.isNoAd) {
                console.log('no ad', id)
                resolve(false)
              } else {
                const iframeEl = adAreaElRef.current?.querySelector('iframe')

                if (iframeEl) {
                  iframeIdRef.current = iframeEl.getAttribute('id')
                }

                resolve(true)
              }
            })

            // 광고 클릭
            banner.addEventListener('adClicked', () => {
              // 광고 클릭시, 이벤트 처리
              // console.log('adClicked')
            })

            banner.display(id)
          } else {
            // 광고 로드 결과
            banner.addEventListener('adLoadCompleted', (event: any) => {
              console.log('adLoadCompleted', placementIds[i], event)

              if (event.isNoAd) {
                resolve(false)
              } else {
                // 네이티브 광고 노출 시점에 호출
                banner.reportImpression()

                resolve(true)
              }
            })

            //  네이티브 광고 호출
            banner.loadAd()
          }
        })

        if (result) break
        else if (i === placementIds.length - 1) {
          console.log('show default ad')
          setIsShowDefaultAd(true)
        }
      }
    },
    []
  )

  const setupGoogleBannerAd = useCallback(
    (type: string, id: string, slotId: string, appKey: string, placementIds: string[]) => {
      if (isSetupGptRef.current) return

      isSetupGptRef.current = true

      if (!(window.googletag as any)._loaded_) {
        // ad block
        console.log('ad block')
        setIsShowDefaultAd(true)
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

                setupAdpopcornBannerdAd(type, appKey, placementIds, id)
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
            setIsShowDefaultAd(true)
          }
        })
      }
    },
    [setupAdpopcornBannerdAd]
  )

  useEffect(() => {
    if (isAdBlock === null || isLoaded === null) return

    if (isLoaded && !isAdBlock) {
      if (adCode.slotId) {
        setupGoogleBannerAd(
          adCode.type,
          adElIdRef.current,
          adCode.slotId,
          appKey,
          adCode.placementIds
        )
      } else {
        setupAdpopcornBannerdAd(adCode.type, appKey, adCode.placementIds, adElIdRef.current)
      }
    } else {
      setIsShowDefaultAd(true)
    }
  }, [isAdBlock, isLoaded, setupGoogleBannerAd, setupAdpopcornBannerdAd, adCode, appKey])

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
      {!isShowDefaultAd && (
        <div
          id={adElIdRef.current}
          ref={adAreaElRef}
          style={{
            minWidth: `${getAdSize(adCode.type)[0]}px`,
            minHeight: `${getAdSize(adCode.type)[1]}px`
          }}
        />
      )}
      {isShowDefaultAd && defaultAdType === 'googleAdsense' && (
        <GoogleAdsense type={getGoogleAdSenseType(adCode.type)} adClickCallback={adClickCallback} />
      )}
      {isShowDefaultAd && defaultAdType === 'fortuneCookie' && (
        <FortuneCookieAd
          type={getFortuneCookieAdType(adCode.type)}
          adClickCallback={adClickCallback}
        />
      )}
    </div>
  )
}
