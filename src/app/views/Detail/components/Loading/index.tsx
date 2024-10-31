import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { useFlow } from '@stackflow/react/future'
import { ActivityNames } from '@/app/shared/libs/stackflow'
import { CoupangData } from '@/modules/ad/domain/Coupang'
import modules from '@/modules'
import CoupangAd from '@/app/views/Detail/components/CoupangAd'
import GoogleAdsense from '@/app/shared/components/GoogleAdsense'
import { useSetInactiveStocks } from '@/app/shared/hooks/useInactiveStockCodes'
import { useGetIsShowCoupangAd, useSetCoupangAdWatchedAt } from '@/app/shared/hooks/useCoupangAd'
import * as styles from '@/app/views/Detail/components/Loading/style.css'

interface LoadingProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setIsShowOverlayAd: Dispatch<SetStateAction<boolean>>
}

export default function Loading({ setIsLoading, setIsShowOverlayAd }: LoadingProps) {
  const searchParams = useSearchParams()
  const { push, pop } = useFlow()

  const setInactiveStocks = useSetInactiveStocks()
  const setCoupangAdWatchedAt = useSetCoupangAdWatchedAt()
  const getIsShowCoupangAd = useGetIsShowCoupangAd()

  const [coupangData, setCoupangData] = useState<CoupangData | null>(null)
  const [isFinishedLoading, setIsFinsihedLoading] = useState<boolean>(false)
  const [skipSeconds, setSkipSeconds] = useState<number>(5)

  const progressElRef = useRef<SVGCircleElement>(null)

  const isShowCoupangAd = getIsShowCoupangAd()

  const updateCoupangData = useCallback(async () => {
    try {
      const coupangAdData = await modules.ad.getCoupang('240X216')

      const coupangData = coupangAdData.data[Math.floor(Math.random() * coupangAdData.data.length)]

      setCoupangData(coupangData)
    } catch (error) {
      push(ActivityNames.Error, {
        title: '잠시 후 다시 시도해주세요',
        desc: '일시적인 오류가 발생하여<br />현재 서비스를 이용할 수 없습니다.'
      })
    }
  }, [])

  function handleClickConfirmButton() {
    if (!isFinishedLoading) return

    const stockCode = searchParams.get('stock_code') as string
    const pmsCode = searchParams.get('pms_code') as string

    setInactiveStocks(stockCode, pmsCode)

    if (isShowCoupangAd) {
      window.open(coupangData?.productUrl)

      setCoupangAdWatchedAt(new Date().toISOString())
    }

    setIsLoading(false)
    setIsShowOverlayAd(true)
  }

  function handleClickCloseButton() {
    setCoupangAdWatchedAt(new Date().toISOString())

    pop()
  }

  useEffect(() => {
    setIsFinsihedLoading(false)

    updateCoupangData()
  }, [updateCoupangData])

  useEffect(() => {
    const timerId = setInterval(() => {
      setSkipSeconds((prevState) => {
        if (prevState <= 0) return 0
        else return prevState - 1
      })
    }, 1000)

    return () => {
      clearInterval(timerId)
    }
  }, [])

  useEffect(() => {
    if (!progressElRef.current) return

    const animation = progressElRef.current.animate(
      [
        {
          strokeDashoffset: '0'
        }
      ],
      { duration: 5000, fill: 'forwards' }
    )

    animation.onfinish = () => {
      setIsFinsihedLoading(true)
    }
  }, [])

  return (
    <div className={styles.area}>
      <div className={styles.content}>
        <div className={styles.loadingContent}>
          <p className={styles.title}>
            {isFinishedLoading ? (
              <>
                라씨가 종목 분석을
                <br />
                완료했어요!
              </>
            ) : (
              <>
                라씨가 투자 종목을
                <br />
                분석하고 있어요
              </>
            )}
          </p>

          <div className={styles.centerArea}>
            <div className={styles.progressArea}>
              {!isFinishedLoading ? (
                <svg width="170" height="170" className={styles.progressDecoArea}>
                  <circle className={styles.progressBorder} r="85" cx="85" cy="85" />
                  <circle className={styles.progress} ref={progressElRef} r="85" cx="85" cy="85" />
                  <defs>
                    <linearGradient
                      id="paint0_linear_248_1103"
                      x1="4.72367e-07"
                      y1="163.5"
                      x2="176"
                      y2="-6.00001"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#0768DD" />
                      <stop offset="1" stopColor="#60E6FE" />
                    </linearGradient>
                  </defs>
                </svg>
              ) : (
                <div className={styles.pulse}>
                  <div className={styles.baackground} />
                  <div className={styles.baackground} />
                  <div className={styles.baackground} />
                </div>
              )}
              <figure className={styles.imgArea}>
                <img src="/images/detail/lock.png" alt="자물쇠 이미지" />
              </figure>
            </div>
          </div>
        </div>

        <div className={styles.adArea} style={{ height: !isShowCoupangAd ? '280px' : '223px' }}>
          <div
            className={styles.adContent}
            style={{ marginBottom: !isShowCoupangAd ? '5.4rem' : '1.2rem' }}
          >
            {isShowCoupangAd && coupangData && (
              <CoupangAd
                skipSeconds={skipSeconds}
                data={coupangData}
                isFinishedLoading={isFinishedLoading}
                handleClickConfirmButton={handleClickConfirmButton}
                handleClickCloseButton={handleClickCloseButton}
              />
            )}
            {!isShowCoupangAd && (
              <div className={styles.googleAdArea}>
                <GoogleAdsense type="medium" />
              </div>
            )}
          </div>
          <button
            className={`${styles.button} ${isFinishedLoading ? 'show' : ''}`}
            onClick={handleClickConfirmButton}
          >
            {isShowCoupangAd && coupangData ? '광고보고 추천 종목 확인하기' : '추천 종목 확인하기'}
            {isShowCoupangAd && coupangData && (
              <span
                className={styles.timer}
                onClick={(event) => {
                  event.stopPropagation()

                  if (skipSeconds === 0) {
                    handleClickCloseButton()
                  }
                }}
              >
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
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
