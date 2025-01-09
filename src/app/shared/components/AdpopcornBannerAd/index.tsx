import { useActivity } from '@stackflow/react'
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'

import { AdCode, AdpopcornType } from '../../config'
import { ActivityNames, useFlow } from '../../libs/stackflow'
import isIos from '../../utils/isIos'
import { useIsAdBlock } from '../../hooks/useIsAdBlock'
import { useIsLoadedAdpopcornScriptValue } from '../../hooks/useIsLoadedAdpopcornScript'
import { skeleton } from '../../styles/skeleton.css'
import * as styles from './style.css'

interface AdpopcornBannerAdProps {
  appKey: string
  adCode: AdCode
  defaultAd: ReactElement
  adClickCallback?: Function
}

export default function AdpopcornBannerAd({
  appKey,
  adCode,
  defaultAd,
  adClickCallback
}: AdpopcornBannerAdProps) {
  const activity = useActivity()
  const { push } = useFlow()
  const isLoaded = useIsLoadedAdpopcornScriptValue()
  const isAdBlock = useIsAdBlock()

  const [nativeAdData, setNativeAdData] = useState<{
    ctaText: string
    desc: string
    iconImageURL: string
    landingURL: string
    mainImageURL: string
    privacyPolicyImageURL: string
    privacyPolicyURL: string
    title: string
  } | null>(null)
  const [isShowDefaultAd, setIsShowDefaultAd] = useState<boolean>(false)

  const isSetupGptRef = useRef<boolean>(false)
  const isSetupAdpopcornRef = useRef<boolean>(false)
  const slotRef = useRef<googletag.Slot | null>(null)
  const adElIdRef = useRef<string>(`${adCode.id}-${new Date().toISOString()}`)
  const iframeIdRef = useRef<string | null>(null)
  const areaElRef = useRef<HTMLDivElement>(null)
  const adAreaElRef = useRef<HTMLDivElement>(null)

  const handleVisibilityChangeWindow = useCallback(() => {
    const activeEl = document.activeElement

    const isCurActivityHidden = activity.isTop && document.visibilityState === 'hidden'
    const isClickedAdIframe =
      activeEl &&
      activeEl.tagName === 'IFRAME' &&
      activeEl.getAttribute('id') === iframeIdRef.current

    if (isCurActivityHidden && isClickedAdIframe) {
      console.log('adClicked', iframeIdRef.current)

      if (!isIos()) {
        push(ActivityNames.Empty, {}, { animate: false })
      }

      adClickCallback?.()
    }
  }, [adClickCallback, activity])

  const setupAdpopcornBannerdAd = useCallback(
    async (appKey: string, id: string, adCode: AdCode) => {
      if (isSetupAdpopcornRef.current) return

      console.log('setupAdpopcornBannerdAd')

      isSetupAdpopcornRef.current = true

      let banner: any

      for (let i = 0; i < adCode.placementIds.length; i++) {
        const result = await new Promise<boolean>((resolve) => {
          if (adCode.type === AdpopcornType.NATIVE) {
            // Native
            banner = window.AdPopcornSSPWebSDK.createNative({
              app_key: appKey,
              placement_id: adCode.placementIds[i]
            })
          } else if (adCode.type === AdpopcornType.BANNER && adCode.size) {
            // Banner
            // 320X50
            if (adCode.size.width === 320 && adCode.size.height === 50) {
              banner = window.AdPopcornSSPWebSDK.createBannerSize320x50({
                app_key: appKey,
                placement_id: adCode.placementIds[i]
              })
            } else if (adCode.size.width === 300 && adCode.size.height === 250) {
              // 300X250
              banner = window.AdPopcornSSPWebSDK.createBannerSize300x250({
                app_key: appKey,
                placement_id: adCode.placementIds[i]
              })
            } else if (adCode.size.width === 320 && adCode.size.height === 100) {
              // 320X100
              banner = window.AdPopcornSSPWebSDK.createBannerSize320x100({
                app_key: appKey,
                placement_id: adCode.placementIds[i]
              })
            } else {
              resolve(false)
            }
          } else {
            resolve(false)
          }

          if (adCode.type === AdpopcornType.BANNER) {
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
          } else if (adCode.type === AdpopcornType.NATIVE) {
            // 광고 로드 결과
            banner.addEventListener('adLoadCompleted', (event: any) => {
              console.log('adLoadCompleted', adCode.placementIds[i], event)

              if (event.isNoAd && !event.adData) {
                resolve(false)
              } else {
                // 네이티브 광고 노출 시점에 호출
                setNativeAdData(event.adData)

                banner.reportImpression()

                resolve(true)
              }
            })

            //  네이티브 광고 호출
            banner.loadAd()
          }
        })

        if (result) break
        else if (i === adCode.placementIds.length - 1) {
          console.log('setIsShowDefaultAd')
          setIsShowDefaultAd(true)
        }
      }
    },
    []
  )

  const setupGoogleBannerAd = useCallback(
    (appKey: string, id: string, adCode: AdCode) => {
      if (isSetupGptRef.current) return

      console.log('setupGoogleBannerAd')

      isSetupGptRef.current = true

      if (!(window.googletag as any)._loaded_) {
        // ad block
        console.log('setIsShowDefaultAd')
        setIsShowDefaultAd(true)
      } else {
        googletag.cmd.push(function () {
          const size: googletag.GeneralSize = [adCode.size!.width, adCode.size!.height]

          slotRef.current = googletag.defineSlot(adCode.slotId!, size, id)

          if (slotRef.current) {
            slotRef.current.addService(googletag.pubads())

            googletag.pubads().addEventListener('slotRenderEnded', (event) => {
              if (event.slot !== slotRef.current) return

              if (event.isEmpty) {
                // 구글 스크립트 실행 결과, 광고가 없을 경우 애드팝콘 패스백 처리
                if (adAreaElRef.current) {
                  adAreaElRef.current.replaceChildren()
                }

                setupAdpopcornBannerdAd(appKey, id, adCode)
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
            console.log('setIsShowDefaultAd')
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
        setupGoogleBannerAd(appKey, adElIdRef.current, adCode)
      } else {
        setupAdpopcornBannerdAd(appKey, adElIdRef.current, adCode)
      }
    } else {
      console.log('setIsShowDefaultAd')
      setIsShowDefaultAd(true)
    }
  }, [isAdBlock, isLoaded, setupGoogleBannerAd, setupAdpopcornBannerdAd, appKey, adCode])

  useEffect(() => {
    return () => {
      if (!slotRef.current) return

      googletag.destroySlots([slotRef.current])
    }
  }, [])

  useEffect(() => {
    window.addEventListener('visibilitychange', handleVisibilityChangeWindow)

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChangeWindow)
    }
  }, [handleVisibilityChangeWindow])

  return (
    <div
      className={`${styles.area} ${
        isSetupAdpopcornRef.current || isSetupGptRef.current ? '' : skeleton
      }`}
      ref={areaElRef}
    >
      {!isShowDefaultAd ? (
        <div
          id={adElIdRef.current}
          ref={adAreaElRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: `${adCode.size?.width}px`,
            minHeight: `${adCode.size?.height}px`
          }}
        >
          {nativeAdData && (
            <img
              onClick={() => {
                window.open(nativeAdData.landingURL)

                if (!isIos()) {
                  push(ActivityNames.Empty, {}, { animate: false })
                }

                adClickCallback?.()
              }}
              className={styles.adImg}
              src={nativeAdData.mainImageURL}
              alt={nativeAdData.title}
            />
          )}
        </div>
      ) : (
        defaultAd
      )}
    </div>
  )
}
