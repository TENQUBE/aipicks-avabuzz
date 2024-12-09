import { useCallback, useEffect, useState } from 'react'
import { ActivityComponentType } from '@stackflow/react'
import { useFlow } from '@stackflow/react/future'

import { ActivityNames } from '@/app/shared/libs/stackflow'
import modules from '@/modules'
import { CoupangData } from '@/modules/ad/domain/Coupang'
import GoogleAdsense from '@/app/shared/components/GoogleAdsense'
import Modal from '@/app/shared/components/Modal'
import { useGetIsShowCoupangAd, useSetCoupangAdWatchedAt } from '@/app/shared/hooks/useCoupangAd'
import { useSetActivityParams } from '@/app/shared/hooks/useActivityParams'
import * as styles from './style.css'

const CoupangAdModal: ActivityComponentType = () => {
  const { replace, pop } = useFlow()

  const [coupangData, setCoupangData] = useState<CoupangData | null>(null)
  const [isFinishedLoading, setIsFinsihedLoading] = useState<boolean>(false)
  const [skipSeconds, setSkipSeconds] = useState<number>(5)

  const setCoupangAdWatchedAt = useSetCoupangAdWatchedAt()
  const getIsShowCoupangAd = useGetIsShowCoupangAd()
  const setActivityParams = useSetActivityParams()

  const isShowCoupangAd = getIsShowCoupangAd()

  function handleClickConfirmButton() {
    if (isShowCoupangAd) {
      window.open(coupangData?.productUrl)

      setCoupangAdWatchedAt(new Date().toISOString())
    }

    setActivityParams(ActivityNames.CoupangAdModal, ActivityNames.Detail, { isSeenAd: true })

    pop()
  }

  function handleClickCloseButton() {
    setCoupangAdWatchedAt(new Date().toISOString())

    pop()
  }

  const updateCoupangData = useCallback(async () => {
    try {
      const coupangAdData = await modules.ad.getCoupang('240X216')

      const coupangData = coupangAdData.data[Math.floor(Math.random() * coupangAdData.data.length)]

      setCoupangData(coupangData)
    } catch (error) {
      replace(ActivityNames.Error, {
        title: '잠시 후 다시 시도해주세요',
        desc: '일시적인 오류가 발생하여<br />현재 서비스를 이용할 수 없습니다.'
      })
    }
  }, [])

  useEffect(() => {
    if (!coupangData) return

    const timerId = setInterval(() => {
      setSkipSeconds((prevState) => {
        if (prevState <= 0) {
          setIsFinsihedLoading(true)
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
    setIsFinsihedLoading(false)

    updateCoupangData()
  }, [updateCoupangData])

  return (
    <Modal>
      {coupangData && (
        <div className={styles.area}>
          {isShowCoupangAd && <p className={styles.productName}>{coupangData.productName}</p>}
          <div className={styles.adArea}>
            {isShowCoupangAd ? (
              <>
                <img src={coupangData.productImage} alt={coupangData.productName} />
                <span className={styles.adText}>AD</span>
              </>
            ) : (
              <GoogleAdsense type="modal" />
            )}
          </div>
          {isShowCoupangAd && (
            <p className={styles.adDesc}>
              이 포스팅은 쿠팡 파트너스 활동의 일환으로,
              <br />
              이에 따른 일정액의 수수료를 제공받습니다.
            </p>
          )}
          <button className={styles.confirmButton} onClick={handleClickConfirmButton}>
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
            {isShowCoupangAd ? '상품보러가기' : '추천 종목 확인하기'}
          </button>
        </div>
      )}
    </Modal>
  )
}

export default CoupangAdModal
