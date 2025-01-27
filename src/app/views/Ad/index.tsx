import { sendGAEvent } from '@next/third-parties/google'
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import { ActivityComponentType } from '@stackflow/react'

import {
  ADPOPCORN_AOS_APP_KEY,
  ADPOPCORN_AOS_BANNER_300X250_1,
  ADPOPCORN_IOS_APP_KEY,
  ADPOPCORN_IOS_BANNER_300X250_1
} from '@/app/shared/config'
import isIos from '@/app/shared/utils/isIos'
import { ActivityNames, useFlow, useStepFlow } from '@/app/shared/libs/stackflow'
import modules from '@/modules'
import { CoupangData } from '@/modules/ad/domain/Coupang'
import AdpopcornBannerAd from '@/app/shared/components/AdpopcornBannerAd'
import Modal from '@/app/shared/components/Modal'
import GoogleAdsense from '@/app/shared/components/GoogleAdsense'
import FortuneCookieAd from '@/app/shared/components/FortuneCookieAd'
import {
  useDefaultAdTypeValue,
  useGetIsShowCoupangAd,
  useSetCoupangAdWatchedAt
} from '@/app/shared/hooks/useCoupangAd'
import { useSetActivityParams } from '@/app/shared/hooks/useActivityParams'
import { useDeviceIdValue } from '@/app/shared/hooks/useDeviceId'
import { skeleton } from '@/app/shared/styles/skeleton.css'
import * as styles from './style.css'

const Ad: ActivityComponentType = () => {
  const { replace, pop } = useFlow()
  const { pushStep } = useStepFlow(ActivityNames.Detail)
  const deviceId = useDeviceIdValue()
  const defaultAdType = useDefaultAdTypeValue()
  const setCoupangAdWatchedAt = useSetCoupangAdWatchedAt()
  const getIsShowCoupangAd = useGetIsShowCoupangAd()
  const setActivityParams = useSetActivityParams()

  const [coupangData, setCoupangData] = useState<CoupangData | null>(null)
  const [skipSeconds, setSkipSeconds] = useState<number>(5)

  const isShowCoupangAd = getIsShowCoupangAd()

  const isShowCoupangAdRef = useRef<boolean>(isShowCoupangAd)
  const isFetchedRef = useRef<boolean>(false)

  const adpopcornAppKey = isIos() ? ADPOPCORN_IOS_APP_KEY : ADPOPCORN_AOS_APP_KEY
  const adpopcornAdCode = isIos() ? ADPOPCORN_IOS_BANNER_300X250_1 : ADPOPCORN_AOS_BANNER_300X250_1

  // CoupangAd Click
  function handleClickConfirmButton() {
    if (!isShowCoupangAdRef.current || !coupangData) return

    window.open(coupangData.productUrl)

    setCoupangAdWatchedAt(new Date().toISOString())

    if (process.env.NODE_ENV === 'production') {
      sendGAEvent('event', '추천종목_참여_play')
    }

    setActivityParams(ActivityNames.Ad, ActivityNames.Detail, { isSeenAd: true })

    pop()

    if (!isIos()) {
      pushStep({ adClicked: true })
    }
  }

  // CoupangAd Close Click
  function handleClickCloseButton(event: MouseEvent) {
    event.stopPropagation()

    if (skipSeconds <= 0) {
      setCoupangAdWatchedAt(new Date().toISOString())

      pop()
    }
  }

  // Adpopcorn, FortuneCookie, GoogleAdSense Click
  const adClickCallback = useCallback(() => {
    if (process.env.NODE_ENV === 'production') {
      sendGAEvent('event', '추천종목_참여_play')
    }

    setActivityParams(ActivityNames.Ad, ActivityNames.Detail, { isSeenAd: true })

    pop()
  }, [])

  const fetchData = useCallback(async () => {
    try {
      const coupangAdData = await modules.ad.getCoupang(deviceId, '300X250')

      const coupangData = coupangAdData.data[Math.floor(Math.random() * coupangAdData.data.length)]

      setCoupangData(coupangData)
    } catch (error) {
      replace(ActivityNames.Error, {
        title: '잠시 후 다시 시도해주세요',
        desc: '일시적인 오류가 발생하여<br />현재 서비스를 이용할 수 없습니다.'
      })
    }
  }, [deviceId])

  useEffect(() => {
    if (coupangData || !isShowCoupangAdRef.current || isFetchedRef.current) return

    isFetchedRef.current = true

    fetchData()
  }, [coupangData, fetchData])

  useEffect(() => {
    if (!isShowCoupangAdRef.current || !coupangData) return

    const timerId = setInterval(() => {
      setSkipSeconds((prevState) => {
        if (prevState <= 0) {
          return 0
        } else {
          return prevState - 1
        }
      })
    }, 1000)

    return () => {
      clearInterval(timerId)
    }
  }, [coupangData])

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      sendGAEvent('event', '로딩')
    }
  }, [])

  return (
    <Modal isShowCloseButton={!isShowCoupangAdRef.current}>
      <div className={styles.area}>
        {isShowCoupangAdRef.current && (
          <p className={`${styles.productName} ${coupangData === null ? skeleton : ''}`}>
            {coupangData?.productName}
          </p>
        )}
        <div className={styles.adArea}>
          {isShowCoupangAdRef.current ? (
            <div className={`${styles.coupangImgArea} ${coupangData === null ? skeleton : ''}`}>
              <img src={coupangData?.productImage} alt={coupangData?.productName} />
              <span className={styles.adText}>AD</span>
            </div>
          ) : (
            <AdpopcornBannerAd
              appKey={adpopcornAppKey}
              adCode={adpopcornAdCode}
              defaultAd={
                defaultAdType === 'fortuneCookie' ? (
                  <FortuneCookieAd type="modal" adClickCallback={adClickCallback} />
                ) : (
                  <GoogleAdsense type="modal" adClickCallback={adClickCallback} />
                )
              }
              adClickCallback={adClickCallback}
            />
          )}
        </div>
        <p
          className={styles.adDesc}
          dangerouslySetInnerHTML={{
            __html: isShowCoupangAdRef.current
              ? '이 포스팅은 쿠팡 파트너스 활동의 일환으로,<br />이에 따른 일정액의 수수료를 제공받습니다.'
              : '광고로 이동하여 5초 이상 방문하고 돌아오면<br />추천종목을 확인할 수 있어요.'
          }}
        />
        {isShowCoupangAdRef.current && (
          <button className={styles.confirmButton} onClick={handleClickConfirmButton}>
            <span className={styles.timer} onClick={handleClickCloseButton}>
              {skipSeconds === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.46802 1.04507C2.0746 0.651645 1.43849 0.651645 1.04507 1.04507C0.651645 1.43849 0.651645 2.0746 1.04507 2.46802L4.57705 6L1.04507 9.53198C0.651645 9.9254 0.651645 10.5615 1.04507 10.9549C1.43849 11.3484 2.0746 11.3484 2.46802 10.9549L6 7.42295L9.53198 10.9549C9.9254 11.3484 10.5615 11.3484 10.9549 10.9549C11.3484 10.5615 11.3484 9.9254 10.9549 9.53198L7.42295 6L10.9549 2.46802C11.3408 2.08218 11.3408 1.43849 10.9549 1.05265C10.5615 0.659229 9.9254 0.659229 9.53198 1.05265L6.00018 4.57723L2.46802 1.04507Z"
                    fill="white"
                  />
                </svg>
              ) : (
                skipSeconds
              )}
            </span>
            상품보러가기
          </button>
        )}
      </div>
    </Modal>
  )
}

export default Ad
