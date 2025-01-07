import { MouseEventHandler, useState } from 'react'

import {
  ADPOPCORN_AOS_APP_KEY,
  ADPOPCORN_AOS_BANNER_320X100_1,
  ADPOPCORN_AOS_RV_2,
  ADPOPCORN_IOS_APP_KEY,
  ADPOPCORN_IOS_BANNER_320X100_1,
  ADPOPCORN_IOS_RV_2
} from '@/app/shared/config'
import isIos from '@/app/shared/utils/isIos'
import LoadingModal from '../LoadingModal'
import AdpopcornRewardAd from '@/app/shared/components/AdpopcornRewardAd'
import AdpopcornBannerAd from '@/app/shared/components/AdpopcornBannerAd'
import InterstitialAd from '@/app/shared/components/InterstitialAd'
import GoogleAdsense from '@/app/shared/components/GoogleAdsense'
import { useGetIsShowCoupangAd } from '@/app/shared/hooks/useCoupangAd'
import * as styles from './style.css'

interface FortuneCookieResultProps {
  fortuneCookieResult: string
  handleClickRetryButton: MouseEventHandler
}

export default function FortuneCookieResult({
  fortuneCookieResult,
  handleClickRetryButton
}: FortuneCookieResultProps) {
  const getIsShowCoupangAd = useGetIsShowCoupangAd()

  const [isShowLoading, setIsShowLoading] = useState<boolean>(true)
  const [isShowResult, setIsShowResult] = useState<boolean>(false)

  const isShowRV = getIsShowCoupangAd()

  const adpopcornAppKey = isIos() ? ADPOPCORN_IOS_APP_KEY : ADPOPCORN_AOS_APP_KEY
  const adpopcornRewardAdCode = isIos() ? ADPOPCORN_IOS_RV_2 : ADPOPCORN_AOS_RV_2
  const adpopcornBannerAdCode = isIos()
    ? ADPOPCORN_IOS_BANNER_320X100_1
    : ADPOPCORN_AOS_BANNER_320X100_1

  function closedSlotCallback() {
    setIsShowResult(true)
    setIsShowLoading(false)
  }

  function rewardGrantedCallback() {
    console.log('reward granted')
  }

  return (
    <>
      {isShowLoading && <LoadingModal />}
      {!isShowResult && isShowRV && (
        <AdpopcornRewardAd
          appKey={adpopcornAppKey}
          adCode={adpopcornRewardAdCode}
          defaultAd={<InterstitialAd closeCallback={closedSlotCallback} />}
          closedSlotCallback={closedSlotCallback}
          rewardGrantedCallback={rewardGrantedCallback}
        />
      )}
      {!isShowResult && !isShowRV && <InterstitialAd closeCallback={closedSlotCallback} />}
      <div className={styles.area}>
        <div className={styles.imgArea}>
          <img
            className={`${styles.startImg} first`}
            src={`/images/fortune-cookie/star_1.png`}
            alt="별 이미지"
          />
          <img
            className={`${styles.startImg} second`}
            src={`/images/fortune-cookie/star_1.png`}
            alt="별 이미지"
          />
          <img
            className={styles.circleImg}
            src={`/images/fortune-cookie/circle_1.png`}
            alt="원 이미지"
          />
          <img
            className={`${styles.pieImg} first`}
            src={`/images/fortune-cookie/pie_1.png`}
            alt="파이 이미지"
          />
          <img
            className={`${styles.pieImg} second`}
            src={`/images/fortune-cookie/pie_1.png`}
            alt="파이 이미지"
          />
          <img
            className={`${styles.pieImg} third`}
            src={`/images/fortune-cookie/pie_1.png`}
            alt="파이 이미지"
          />
          <img
            className={`${styles.triangleImg} first`}
            src={`/images/fortune-cookie/triangle_1.png`}
            alt="세모 이미지"
          />
          <img
            className={`${styles.triangleImg} second`}
            src={`/images/fortune-cookie/triangle_1.png`}
            alt="세모 이미지"
          />
          <img
            className={`${styles.triangleImg} third`}
            src={`/images/fortune-cookie/triangle_2.png`}
            alt="세모 이미지"
          />
          <img
            className={styles.fortuneCookieImg}
            src={`/images/fortune-cookie/fortune_cookie_3.png`}
            alt="포춘쿠키 깨진 이미지"
          />
        </div>

        {isShowResult && (
          <div className={styles.fortuneCookieResultArea}>{fortuneCookieResult}</div>
        )}
        <button className={styles.button} onClick={handleClickRetryButton}>
          한번 더 하기
        </button>
      </div>
      <div className={styles.adArea}>
        <AdpopcornBannerAd
          appKey={adpopcornAppKey}
          adCode={adpopcornBannerAdCode}
          defaultAd={<GoogleAdsense type="banner" />}
        />
      </div>
    </>
  )
}
