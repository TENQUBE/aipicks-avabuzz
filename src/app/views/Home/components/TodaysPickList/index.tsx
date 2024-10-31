import { useCallback, useEffect, useState } from 'react'
import { useActivity } from '@stackflow/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type SwiperType from 'swiper/core'
import { Autoplay, EffectCoverflow } from 'swiper/modules'
import dayjs from 'dayjs'

import { useFlow } from '@/app/shared/libs/stackflow'
import { ActivityNames } from '@/app/shared/libs/stackflow'
import modules from '@/modules'
import { TodayPickVM } from '@/modules/stock/adaptor/in/ui/vm/TodayPickVM'
import { BaseInfoDataVM } from '@/modules/stock/adaptor/in/ui/vm/BaseInfoDataVM'
import { Signal1yChartVM } from '@/modules/stock/adaptor/in/ui/vm/Signal1yChartVM'
import {
  useClearInactiveStocks,
  useInactiveStocksValue
} from '@/app/shared/hooks/useInactiveStockCodes'
import {
  useSetTodaysPickUpdatedAt,
  useTodaysPickUpdatedAtValue
} from '@/app/shared/hooks/useTodaysPickUpdatedAt'
import * as styles from '@/app/views/Home/components/TodaysPickList/style.css'

export default function TodaysPickList() {
  const { push } = useFlow()
  const activity = useActivity()

  const inactiveStocks = useInactiveStocksValue()
  const clearInactiveStocks = useClearInactiveStocks()
  const todaysPickUpdatedAt = useTodaysPickUpdatedAtValue()
  const setTodaysPickUpdatedAt = useSetTodaysPickUpdatedAt()

  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [todaysPick, setTodaysPick] = useState<TodayPickVM[]>([])
  const [inactiveStockInfoDataList, setInactiveStockInfoDataList] = useState<
    {
      stockCode: string
      pmsCode: string
      baseInfo: BaseInfoDataVM
      signalInfo: Signal1yChartVM
    }[]
  >([])

  function isInactiveStockCode(stockCode: string) {
    return !!inactiveStocks.find((inactiveStock) => inactiveStock.stockCode === stockCode)
  }

  function getInactiveStockInfoData(stockCode: string) {
    return inactiveStockInfoDataList.find((item) => item.stockCode === stockCode)
  }

  function handleClickSlide(stockCode: string, pmsCode: string) {
    push(ActivityNames.Detail, { stock_code: stockCode, pms_code: pmsCode })
  }

  const updateTodayPicks = useCallback(async () => {
    try {
      const todaysPick = await modules.stock.getTodayPicks()

      if (inactiveStocks.length > 0) {
        async function getStockInfoData(stockCode: string, pmsCode: string) {
          const [baseInfo, signalInfo] = await Promise.all([
            modules.stock.getBaseInfoData(stockCode, pmsCode),
            modules.stock.getSignal1yChart(stockCode, pmsCode)
          ])

          return { stockCode, pmsCode, baseInfo, signalInfo }
        }

        const stockInfoData = await Promise.all(
          inactiveStocks.map(({ stockCode, pmsCode }) => getStockInfoData(stockCode, pmsCode))
        )

        setInactiveStockInfoDataList(stockInfoData)
      }

      setTodaysPick([...todaysPick, ...todaysPick])
    } catch (error) {
      push(ActivityNames.Error, {
        title: '잠시 후 다시 시도해주세요',
        desc: '일시적인 오류가 발생하여<br />현재 서비스를 이용할 수 없습니다.'
      })
    }
  }, [inactiveStocks])

  useEffect(() => {
    updateTodayPicks()
  }, [updateTodayPicks])

  useEffect(() => {
    if (todaysPick.length <= 0) return

    const isUpdateTodaysPick = dayjs(todaysPickUpdatedAt).diff(dayjs().startOf('D'), 'D') < 0

    if (isUpdateTodaysPick) {
      setTodaysPickUpdatedAt(new Date().toISOString())

      clearInactiveStocks()
    }
  }, [todaysPick, todaysPickUpdatedAt])

  useEffect(() => {
    if (activity.isActive && swiper && !swiper.autoplay.running) {
      swiper.autoplay.start()
    }
  }, [activity, swiper])

  useEffect(() => {
    if (!activity.isActive && swiper && swiper.autoplay.running) {
      swiper.autoplay.stop()
    }
  }, [activity, swiper])

  return (
    <Swiper
      className={styles.swiper}
      slideClass={styles.slide}
      effect="coverflow"
      slidesPerView={1}
      loopAdditionalSlides={1}
      modules={[Autoplay, EffectCoverflow]}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false
      }}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: -200,
        modifier: 0.5,
        scale: 0.9,
        slideShadows: false
      }}
      onSwiper={(swiper) => {
        setSwiper(swiper)
      }}
    >
      {todaysPick.length > 0 &&
        todaysPick.map((stock, index) => (
          <SwiperSlide
            className={`${styles.slide} ${
              isInactiveStockCode(stock.stock_code) ? 'inactive' : 'active'
            }`}
            onClick={() => {
              handleClickSlide(stock.stock_code, stock.pms_code)
            }}
            key={index}
          >
            {isInactiveStockCode(stock.stock_code) && (
              <div className={styles.inactiveContent}>
                <span className={styles.inactiveSector}>{stock.sector}</span>
                <span className={styles.inactiveName}>{stock.stock_name}</span>
                {getInactiveStockInfoData(stock.stock_code) && (
                  <>
                    <div
                      className={`${styles.baseInfoArea} ${
                        getInactiveStockInfoData(stock.stock_code)!.baseInfo.code.fluct_amt < 0
                          ? 'minus'
                          : 'plus'
                      }`}
                    >
                      <span className={styles.price}>
                        {`${getInactiveStockInfoData(
                          stock.stock_code
                        )!.baseInfo.code.curPrice.toLocaleString()} 원`}
                      </span>
                      <div className={styles.baesInfoCodeArea}>
                        <span className={styles.baseInfoText}>전일대비</span>
                        {getInactiveStockInfoData(stock.stock_code)!.baseInfo.code.fluct_amt < 0 ? (
                          <svg
                            className={styles.baesInfoCodeAreaIcon}
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M7.19336 12.0137L1 1.5L13.3867 1.5L7.19336 12.0137Z"
                              fill="#0A80F1"
                            />
                          </svg>
                        ) : (
                          <svg
                            className={styles.baesInfoCodeAreaIcon}
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path d="M7.19336 1.5L13.3867 12.0137H1L7.19336 1.5Z" fill="#D92A21" />
                          </svg>
                        )}
                        <span className={styles.flunt}>
                          {`${getInactiveStockInfoData(
                            stock.stock_code
                          )!.baseInfo.code.fluct_amt.toLocaleString()}원`}
                        </span>
                        <span
                          className={`${styles.ratio} ${
                            getInactiveStockInfoData(stock.stock_code)!.baseInfo.code.fluct_amt < 0
                              ? 'minus'
                              : 'plus'
                          }`}
                        >
                          (
                          {`${getInactiveStockInfoData(
                            stock.stock_code
                          )!.baseInfo.code.ratio.toLocaleString()}%`}
                          )
                        </span>
                      </div>
                    </div>
                    <figure className={styles.chartImgArea}>
                      <img
                        className={styles.chartImgArea}
                        src={getInactiveStockInfoData(stock.stock_code)!.signalInfo.chartName}
                        alt="차트 이미지"
                      />
                    </figure>
                  </>
                )}
              </div>
            )}
            {!isInactiveStockCode(stock.stock_code) && (
              <>
                <figure className={styles.lockImgArea}>
                  <img src="/images/home/lock.png" alt="자물쇠 마크 이미지" />
                  <span className={styles.point}>5P</span>
                </figure>
                <p className={styles.activeDesc}>
                  오늘의 <strong className={styles.activeSector}>{stock.sector}</strong>
                  <br />
                  추천 종목 확인해보세요
                </p>
              </>
            )}

            <button className={styles.button}>
              <span className={styles.buttonText}>
                {isInactiveStockCode(stock.stock_code) ? '자세히 보기' : '5P 받고 확인하기'}
              </span>
            </button>
          </SwiperSlide>
        ))}
    </Swiper>
  )
}
