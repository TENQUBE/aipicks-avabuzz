import { useCallback, useEffect, useState } from 'react'
import { ActivityComponentType, useActivity, useEnterDoneEffect } from '@stackflow/react'

import {
  ADPOPCORN_AOS_APP_KEY,
  ADPOPCORN_AOS_RV_1,
  ADPOPCORN_IOS_APP_KEY,
  ADPOPCORN_IOS_RV_1,
  ANIMATION_DURATION,
  FORTUNE_COOKIE_MESSAGES
} from '@/app/shared/config'
import { ActivityNames, useFlow } from '@/app/shared/libs/stackflow'
import isIos from '@/app/shared/utils/isIos'
import { AppScreen } from '@/app/shared/libs/stackflow/basic-ui'
import AdpopcornRewardAd from '@/app/shared/components/AdpopcornRewardAd'
import FortuneCookieClick from './components/FortuneCookieClick'
import FortuneCookieResult from './components/FortuneCookieResult'
import InterstitialAd from '@/app/shared/components/InterstitialAd'
import { useSetActivityParams } from '@/app/shared/hooks/useActivityParams'
import { useGetIsShowCoupangAd } from '@/app/shared/hooks/useCoupangAd'
import * as styles from './style.css'

const FortuneCookie: ActivityComponentType = () => {
  const activity = useActivity()
  const { pop } = useFlow()

  const getIsShowCoupang = useGetIsShowCoupangAd()
  const setActivityParams = useSetActivityParams()

  const [clickNum, setClickNum] = useState<number>(0)
  const [isShowRewardedAd, setIsShowRewardedAd] = useState<boolean>(false)
  const [fortuneCookieResult, setFortuneCookieResult] = useState<string>('')
  const [isSeenAd, setIsSeenAd] = useState<boolean>(false)

  const isShowRV = getIsShowCoupang()

  const adpopcornAppKey = isIos() ? ADPOPCORN_IOS_APP_KEY : ADPOPCORN_AOS_APP_KEY
  const adpopcornRewardAdCode = isIos() ? ADPOPCORN_IOS_RV_1 : ADPOPCORN_AOS_RV_1

  function closedSlotCallback() {
    console.log('closed slot')
    setIsShowRewardedAd(false)
  }

  function handleClickFortuneCookie() {
    setClickNum((prevState) => prevState + 1)
  }

  function handleClickRetryButton() {
    setClickNum(0)
    setFortuneCookieResult('')

    updateFortuneCookieResult()
  }

  function handleClickCloseButton() {
    setActivityParams(ActivityNames.FortuneCookie, ActivityNames.Ad, { isSeenAd })

    pop()
  }

  const updateFortuneCookieResult = useCallback(() => {
    const messageIndex = Math.floor(Math.random() * FORTUNE_COOKIE_MESSAGES.length)

    setFortuneCookieResult(FORTUNE_COOKIE_MESSAGES[messageIndex])
  }, [])

  useEffect(() => {
    if (fortuneCookieResult) return

    updateFortuneCookieResult()
  }, [fortuneCookieResult, updateFortuneCookieResult])

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsShowRewardedAd(true)
    }, ANIMATION_DURATION)

    return () => {
      clearTimeout(timerId)
    }
  }, [])

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsSeenAd(true)
    }, 3000)

    return () => {
      clearTimeout(timerId)
    }
  }, [])

  useEffect(() => {
    if (activity.transitionState === 'exit-active') {
      setActivityParams(ActivityNames.FortuneCookie, ActivityNames.Ad, { isSeenAd })
    }
  }, [activity, isSeenAd])

  return (
    <AppScreen>
      <div className={styles.arae}>
        {isShowRewardedAd && isShowRV && (
          <AdpopcornRewardAd
            appKey={adpopcornAppKey}
            adCode={adpopcornRewardAdCode}
            closedSlotCallback={closedSlotCallback}
          />
        )}
        {isShowRewardedAd && !isShowRV && <InterstitialAd closeCallback={closedSlotCallback} />}
        <div className={styles.topBar}>
          <svg
            className={styles.closeButton}
            onClick={handleClickCloseButton}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18.6895 5.3216C18.2754 4.90749 17.6065 4.90749 17.1924 5.3216L12.0001 10.5032L6.80786 5.31098C6.39375 4.89687 5.72481 4.89687 5.3107 5.31098C4.8966 5.72508 4.8966 6.39403 5.3107 6.80813L10.503 12.0004L5.3107 17.1927C4.8966 17.6068 4.8966 18.2757 5.3107 18.6898C5.72481 19.1039 6.39375 19.1039 6.80786 18.6898L12.0001 13.4976L17.1924 18.6898C17.6065 19.1039 18.2754 19.1039 18.6895 18.6898C19.1036 18.2757 19.1036 17.6068 18.6895 17.1927L13.4973 12.0004L18.6895 6.80813C19.093 6.40464 19.093 5.72508 18.6895 5.3216Z"
              fill="#F9F9F9"
            />
          </svg>
        </div>
        {clickNum < 3 && (
          <FortuneCookieClick
            clickNum={clickNum}
            handleClickFortuneCookie={handleClickFortuneCookie}
          />
        )}
        {clickNum === 3 && (
          <FortuneCookieResult
            fortuneCookieResult={fortuneCookieResult}
            handleClickRetryButton={handleClickRetryButton}
          />
        )}
      </div>
    </AppScreen>
  )
}

export default FortuneCookie
