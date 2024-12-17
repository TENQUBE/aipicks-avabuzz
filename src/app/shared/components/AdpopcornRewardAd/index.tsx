import { useCallback, useEffect, useRef, useState } from 'react'

import { AdCode } from '../../config'
import InterstitialAd from '../InterstitialAd'
import { useIsLoadedAdpopcornScriptValue } from '../../hooks/useIsLoadedAdpopcornScript'
import { useIsAdBlock } from '../../hooks/useIsAdBlock'
import * as styles from './style.css'

interface AdpopcornRewardAdProps {
  appKey: string
  adCode: AdCode
  rewardGrantedCallback?: (type?: string, amount?: number) => void
  closedSlotCallback: () => void
}

export default function AdpopcornRewardAd({
  appKey,
  adCode,
  rewardGrantedCallback,
  closedSlotCallback
}: AdpopcornRewardAdProps) {
  const isLoaded = useIsLoadedAdpopcornScriptValue()
  const isAdBlock = useIsAdBlock()

  const [isShowDefaultAd, setIsShowDefaultAd] = useState<boolean>(false)

  const adAreaElRef = useRef<HTMLDivElement>(null)
  const isSetupGptRef = useRef<boolean>(false)
  const isSetupAdpopcornRef = useRef<boolean>(false)
  const slotRef = useRef<googletag.Slot | null>(null)
  const adElIdRef = useRef<string>(`${adCode.id}-${new Date().toISOString()}`)

  function handleClickDefaultAdCloseButton() {
    closedSlotCallback()
  }

  const setupAdpopcornRewardedAd = useCallback(
    async (appKey: string, placementIds: string[], id: string) => {
      if (isSetupAdpopcornRef.current) return

      isSetupAdpopcornRef.current = true

      for (let i = 0; i < placementIds.length; i++) {
        const result = await new Promise<boolean>((resolve) => {
          window.AdPopcornSSPWebSDK.cmd.push(() => {
            const rewardVideo = window.AdPopcornSSPWebSDK.createRewardVideo({
              app_key: appKey,
              placement_id: placementIds[i]
            })

            // SDK 연동 실패
            rewardVideo.addEventListener('sdkError', (event: any) => {
              // SDK 연동 실패시, 이벤트 처리
              console.log('sdkError', event.message)
              resolve(false)
            })

            // 광고 렌더링 결과
            rewardVideo.addEventListener('adInventoryRendered', (event: any) => {
              // 광고 렌더링 결과에 따른 이벤트 처리
              if (event.isNoAd) {
                // TODO: no ad 처리
                console.log('no ad')
                resolve(false)
              } else {
                resolve(true)
              }
            })

            // 광고 재생 완료
            rewardVideo.addEventListener('adPlaybackCompleted', () => {
              // 광고 재생 완료시, 이벤트 처리
              console.log('adPlaybackCompleted')
              rewardGrantedCallback?.()
            })

            // 광고 닫기 클릭
            rewardVideo.addEventListener('adClosed', () => {
              // 광고 닫기 클릭시, 이벤트 처리
              console.log('adClosed')
              closedSlotCallback()
            })

            rewardVideo.display(id)
          })
        })

        if (result) break
        else if (i === placementIds.length - 1) {
          console.log('show default ad')
          setIsShowDefaultAd(true)
        }
      }
    },
    [rewardGrantedCallback, closedSlotCallback]
  )

  const setupGoogleRewardedAd = useCallback(
    (slotId: string, appKey: string, placementIds: string[], id: string) => {
      if (isSetupGptRef.current) return

      isSetupGptRef.current = true

      if (!(window.googletag as any)._loaded_) {
        // ad block
        console.log('ad block')
        setIsShowDefaultAd(true)
      } else {
        googletag.cmd.push(() => {
          slotRef.current = googletag.defineOutOfPageSlot(
            slotId,
            googletag.enums.OutOfPageFormat.REWARDED
          )

          // Slot returns null if the page or device does not support rewarded ads.
          if (slotRef.current) {
            slotRef.current.addService(googletag.pubads())

            googletag.pubads().addEventListener('slotRenderEnded', (event) => {
              if (event.slot !== slotRef.current) return

              if (!event.isEmpty) {
                // 구글 스크립트 실행 결과, 광고가 없을 경우 애드팝콘 패스백 처리
                if (adAreaElRef.current) {
                  adAreaElRef.current.replaceChildren()
                }

                setupAdpopcornRewardedAd(appKey, placementIds, id)
              }
            })

            googletag.pubads().addEventListener('rewardedSlotReady', (event) => {
              if (event.slot !== slotRef.current) return

              event.makeRewardedVisible()
            })

            googletag.pubads().addEventListener('rewardedSlotClosed', (event) => {
              if (event.slot !== slotRef.current) return

              closedSlotCallback()

              if (slotRef.current) {
                googletag.destroySlots([slotRef.current])
              }
            })

            googletag.pubads().addEventListener('rewardedSlotGranted', (event) => {
              if (event.slot !== slotRef.current) return

              // Automatically close the ad by destroying the slot.
              // Remove this to force the user to close the ad themselves.
              rewardGrantedCallback?.(event.payload?.type, event.payload?.amount)
            })

            googletag.enableServices()
            googletag.display(slotRef.current)
          } else {
            setIsShowDefaultAd(true)
          }
        })
      }
    },
    [setupAdpopcornRewardedAd, closedSlotCallback, rewardGrantedCallback]
  )

  useEffect(() => {
    if (isAdBlock === null || isLoaded === null) return

    if (isLoaded && !isAdBlock) {
      if (adCode.slotId) {
        setupGoogleRewardedAd(adCode.slotId, appKey, adCode.placementIds, adElIdRef.current)
      } else {
        setupAdpopcornRewardedAd(appKey, adCode.placementIds, adElIdRef.current)
      }
    } else {
      setIsShowDefaultAd(true)
    }
  }, [isAdBlock, isLoaded, setupGoogleRewardedAd, setupAdpopcornRewardedAd, adCode, appKey])

  useEffect(() => {
    return () => {
      if (!slotRef.current) return

      googletag.destroySlots([slotRef.current])
    }
  }, [])

  return (
    <>
      {isShowDefaultAd ? (
        <InterstitialAd closeCallback={handleClickDefaultAdCloseButton} />
      ) : (
        <div className={styles.adArea} ref={adAreaElRef} id={adElIdRef.current} />
      )}
    </>
  )
}
