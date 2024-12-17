import { MouseEventHandler } from 'react'

import {
  ADPOPCORN_AOS_APP_KEY,
  ADPOPCORN_AOS_BANNER_320X100_2,
  ADPOPCORN_IOS_APP_KEY,
  ADPOPCORN_IOS_BANNER_320X100_2
} from '@/app/shared/config'
import isIos from '@/app/shared/utils/isIos'
import AdpopcornBannerAd from '@/app/shared/components/AdpopcornBannerAd'
import * as styles from './style.css'

interface FortuneCookieClickProps {
  clickNum: number
  handleClickFortuneCookie: MouseEventHandler
}

export default function FortuneCookieClick({
  clickNum,
  handleClickFortuneCookie
}: FortuneCookieClickProps) {
  const adpopcornAppKey = isIos() ? ADPOPCORN_IOS_APP_KEY : ADPOPCORN_AOS_APP_KEY
  const adpopcornBannerAdCode = isIos()
    ? ADPOPCORN_IOS_BANNER_320X100_2
    : ADPOPCORN_AOS_BANNER_320X100_2

  return (
    <>
      <div className={styles.area} onClick={handleClickFortuneCookie}>
        <h2 className={styles.title}>오늘의 행운은?</h2>
        {clickNum === 0 ? (
          <div className={styles.introImgArea}>
            <span className={styles.tooltip}>포춘쿠키를 열어보세요!</span>
            <img
              className={styles.fortuneCookieImg}
              src="/images/fortune-cookie/fortune_cookie_intro.png"
              alt="포춘 쿠키 이미지"
            />
          </div>
        ) : (
          <img
            className={styles.fortuneCookieImg}
            src={`/images/fortune-cookie/fortune_cookie_${clickNum}.png`}
            alt={`${clickNum}번재 포춘쿠키 이미지`}
          />
        )}
      </div>
      <div className={styles.adArea}>
        <AdpopcornBannerAd appKey={adpopcornAppKey} adCode={adpopcornBannerAdCode} />
      </div>
    </>
  )
}
