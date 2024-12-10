import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Confetti from 'react-confetti-boom'
import dayjs from 'dayjs'

import { ANIMATION_DURATION } from '@/app/shared/config'
import { AppScreen } from '@/app/shared/libs/stackflow/basic-ui'
import { useFlow } from '@/app/shared/libs/stackflow'
import { ActivityNames } from '@/app/shared/libs/stackflow'
import { BaseInfoDataVM } from '@/modules/stock/adaptor/in/ui/vm/BaseInfoDataVM'
import { Signal1yChartVM } from '@/modules/stock/adaptor/in/ui/vm/Signal1yChartVM'
import { TodayPickVM } from '@/modules/stock/adaptor/in/ui/vm/TodayPickVM'
import modules from '@/modules'
import Layout from '@/app/shared/components/Layout'
import InterstitialGoogleAdsense from '@/app/shared/components/InterstitialGoogleAdsense'
import {
  useInactiveStocksValue,
  useClearInactiveStocks,
  useSetInactiveStocks,
  useIsRehydratedInactiveStock
} from '@/app/shared/hooks/useInactiveStockCodes'
import {
  useIsRehydratedTodaysPickUpdatedAt,
  useSetTodaysPickUpdatedAt,
  useTodaysPickUpdatedAtValue
} from '@/app/shared/hooks/useTodaysPickUpdatedAt'
import {
  useActivityParamsValue,
  useClearActivityParams
} from '@/app/shared/hooks/useActivityParams'
import * as styles from '@/app/views/Detail/style.css'

export default function Detail() {
  const { push } = useFlow()
  const searchParams = useSearchParams()

  const activityParams = useActivityParamsValue()
  const clearActivityParams = useClearActivityParams()
  const inactiveStocks = useInactiveStocksValue()
  const isRehydratedInactiveStock = useIsRehydratedInactiveStock()
  const setInactiveStocks = useSetInactiveStocks()
  const todaysPickUpdatedAt = useTodaysPickUpdatedAtValue()
  const isRehydratedTodaysPickUpdateAt = useIsRehydratedTodaysPickUpdatedAt()
  const setTodaysPickUpdatedAt = useSetTodaysPickUpdatedAt()
  const clearInactiveStocks = useClearInactiveStocks()

  const [isLoading, setIsLoading] = useState<boolean | null>(null)
  const [isShowInterstitialAd, setIsShowInterstitialAd] = useState<boolean>(false)
  const [isShowPointConfetti, setIsShowPointConfetti] = useState<boolean>(false)
  const [toastContent, setToastContent] = useState<string | null>(null)
  const [stockCode, setStockCode] = useState<string | null>(
    searchParams.get('stock_code') ? searchParams.get('stock_code') : null
  )
  const [pmsCode, setPmsCode] = useState<string | null>(
    searchParams.get('pms_code') ? searchParams.get('pms_code') : null
  )
  const [todaysPick, setTodaysPick] = useState<TodayPickVM[] | null>(null)
  const [baseInfoData, setBaseInfoData] = useState<BaseInfoDataVM | null>(null)
  const [signal1yChart, setSignal1yChart] = useState<Signal1yChartVM | null>(null)
  const [stockInfoDataList, setStockInfoDataList] = useState<
    { stockCode: string; pmsCode: string; baseInfo: BaseInfoDataVM }[] | null
  >(null)

  const isFetchedRef = useRef<boolean>(false)
  const toastAreaElRef = useRef<HTMLDivElement>(null)

  const todaysPickList =
    todaysPick && stockCode ? todaysPick.filter((item) => item.stock_code !== stockCode) : null

  function getUpOrDown(value: number | undefined) {
    if (typeof value === 'undefined' || value === 0) return 'none'
    else if (value > 0) return 'up'
    else return 'down'
  }

  function getInactiveStock(stockCode: string) {
    if (!inactiveStocks) return null

    return inactiveStocks.find((item) => item.stockCode === stockCode)
  }

  function getBaseInfo(stockCode: string) {
    if (!stockInfoDataList) return

    return stockInfoDataList.find((item) => item.stockCode === stockCode)?.baseInfo
  }

  const interstitialAdCloseCallback = useCallback(() => {
    setIsShowInterstitialAd(false)

    setTimeout(() => {
      setIsShowPointConfetti(true)
    }, ANIMATION_DURATION)
  }, [])

  function handleClickLoadingButton() {
    push(ActivityNames.CoupangAd, {})
  }

  function handleClickAdvBestItemsButton() {
    push(ActivityNames.AdvBestItems, {})
  }

  function handleClickRassi() {
    window.open('https://tradingpoint.co.kr/')
  }

  function handleClickTodaysPick(stockCode: string, pmsCode: string) {
    push(ActivityNames.Detail, { stock_code: stockCode, pms_code: pmsCode })
  }

  const fetchData = useCallback(
    async (
      inactiveStocks: {
        stockCode: string
        pmsCode: string
      }[],
      todaysPickUpdatedAt: string | null,
      stockCode: string | null,
      pmsCode: string | null
    ) => {
      try {
        const todaysPick = await modules.stock.getTodayPicks()

        const isUpdateTodaysPick = todaysPickUpdatedAt
          ? dayjs(todaysPickUpdatedAt).diff(dayjs().startOf('D'), 'D') < 0
          : true

        let curInactiveStocks = inactiveStocks

        if (isUpdateTodaysPick || !todaysPickUpdatedAt) {
          setTodaysPickUpdatedAt(new Date().toISOString())

          clearInactiveStocks()
          curInactiveStocks = []
        }

        let targetStockCode: string = stockCode ? stockCode : todaysPick[0].stock_code
        let targetPmsCode: string = pmsCode ? pmsCode : todaysPick[0].pms_code

        if (curInactiveStocks.length > 0 && !stockCode && !pmsCode) {
          const activeStock = todaysPick.find(
            ({ stock_code }) =>
              !curInactiveStocks.some((inactiveStock) => inactiveStock.stockCode === stock_code)
          )

          if (activeStock) {
            targetStockCode = activeStock.stock_code
            targetPmsCode = activeStock.pms_code
          }
        }

        const isLoading = !!curInactiveStocks.find(({ stockCode }) => stockCode === targetStockCode)

        if (isLoading) {
          setIsLoading(false)
          setIsShowInterstitialAd(true)
        } else {
          setIsLoading(true)
        }

        setStockCode(targetStockCode)
        setPmsCode(targetPmsCode)

        const [baseInfoData, signal1yChart] = await Promise.all([
          modules.stock.getBaseInfoData(targetStockCode, targetPmsCode),
          modules.stock.getSignal1yChart(targetStockCode, targetPmsCode)
        ])

        if (curInactiveStocks.length > 0) {
          async function getStockInfoData(stockCode: string, pmsCode: string) {
            const baseInfo = await modules.stock.getBaseInfoData(stockCode, pmsCode)

            return { stockCode, pmsCode, baseInfo }
          }

          const stockInfoData = await Promise.all(
            curInactiveStocks.map(({ stockCode, pmsCode }) => getStockInfoData(stockCode, pmsCode))
          )

          setStockInfoDataList(stockInfoData)
        }

        setTodaysPick(todaysPick)
        setBaseInfoData(baseInfoData)
        setSignal1yChart(signal1yChart)
      } catch (error) {
        push(ActivityNames.Error, {
          title: '잠시 후 다시 시도해주세요',
          desc: '일시적인 오류가 발생하여<br />현재 서비스를 이용할 수 없습니다.'
        })
      }
    },
    []
  )

  useEffect(() => {
    if (!isLoading && !isShowInterstitialAd && isShowPointConfetti) {
      setTimeout(() => {
        setIsShowPointConfetti(false)
      }, 2000)
    }
  }, [isLoading, isShowInterstitialAd, isShowPointConfetti])

  useEffect(() => {
    if (isFetchedRef.current || !isRehydratedInactiveStock || !isRehydratedTodaysPickUpdateAt)
      return

    isFetchedRef.current = true

    fetchData(inactiveStocks, todaysPickUpdatedAt, stockCode, pmsCode)
  }, [
    isRehydratedInactiveStock,
    isRehydratedTodaysPickUpdateAt,
    inactiveStocks,
    todaysPickUpdatedAt,
    stockCode,
    pmsCode,
    fetchData
  ])

  useEffect(() => {
    if (
      !todaysPick ||
      !stockCode ||
      !pmsCode ||
      activityParams.to !== ActivityNames.Detail ||
      activityParams.params === null ||
      activityParams.from === null ||
      activityParams.to === null
    )
      return

    switch (activityParams.from) {
      case ActivityNames.CoupangAd:
        if (activityParams.params.isSeenAd) {
          setInactiveStocks(stockCode, pmsCode)

          setIsLoading(false)

          setTimeout(() => {
            setIsShowInterstitialAd(true)
          }, ANIMATION_DURATION)
        } else {
          setToastContent('5초 이상 체류 후 결과 확인이 가능합니다. ')

          setTimeout(() => {
            if (!toastAreaElRef.current) return

            toastAreaElRef.current.classList.remove('close')
            toastAreaElRef.current.classList.add('open')
          }, ANIMATION_DURATION)

          setTimeout(() => {
            if (!toastAreaElRef.current) return

            toastAreaElRef.current.classList.remove('open')
            toastAreaElRef.current.classList.add('close')

            toastAreaElRef.current.addEventListener('animationend', (event: AnimationEvent) => {
              if (event.animationName === styles.toastClose) {
                setToastContent(null)
              }
            })
          }, 2000)
        }

        break
    }

    clearActivityParams()
  }, [todaysPick, stockCode, pmsCode, activityParams])

  function replaceWithAsterisk(value?: string) {
    if (!value) return ''

    if (value.length <= 1) return value
    return value[0] + '*'.repeat(value.length - 1)
  }

  return (
    <AppScreen>
      {isShowInterstitialAd && (
        <InterstitialGoogleAdsense closeCallback={interstitialAdCloseCallback} />
      )}

      <>
        {isShowPointConfetti && (
          <div className={styles.confettiArea}>
            <Confetti
              mode="boom"
              particleCount={25}
              colors={['#253FEB', '#01DF95', '#FF3384']}
              y={0.15}
              spreadDeg={25}
              shapeSize={12}
            />
          </div>
        )}
        <div className={`${styles.confettiContent} ${isShowPointConfetti ? 'open' : 'close'}`}>
          <figure className={styles.coinImgArea}>
            <img src="/images/detail/coin.png" alt="코인 이미지" />
          </figure>
          <span className={styles.confettiTextContent}>1 포인트 적립 완료!</span>
        </div>
      </>

      <div className={styles.toastArea} ref={toastAreaElRef}>
        {toastContent}
      </div>

      {typeof isLoading === 'boolean' && isLoading && (
        <div className={styles.loadingArea}>
          <div className={styles.buttonBackground} />
          <span className={styles.loadingDesc}>다음 내용이 궁금하다면?</span>
          <button className={styles.loadingAreaButton} onClick={handleClickLoadingButton}>
            광고보고 추천종목 확인하기
          </button>
        </div>
      )}

      <Layout title="AI 추천종목" backgroundColor="#fff">
        {typeof isLoading === 'boolean' &&
          todaysPick &&
          baseInfoData &&
          signal1yChart &&
          inactiveStocks && (
            <div className={styles.area}>
              <div className={styles.content}>
                <span className={styles.code}>
                  {!isLoading
                    ? todaysPick.find((item) => item.stock_code === stockCode)?.pms_code
                    : replaceWithAsterisk(
                        todaysPick.find((item) => item.stock_code === stockCode)?.pms_code
                      )}
                </span>
                <span className={styles.name}>
                  {!isLoading
                    ? baseInfoData.code.stock_name
                    : replaceWithAsterisk(baseInfoData.code.stock_name)}
                </span>
                <span className={`${styles.price} ${getUpOrDown(baseInfoData.code.ratio)}`}>
                  {baseInfoData?.code.curPrice.toLocaleString()}원
                </span>
                <div className={styles.fluntArea}>
                  <span className={`${styles.fluntAmount} ${getUpOrDown(baseInfoData.code.ratio)}`}>
                    {baseInfoData.code.fluct_amt.toLocaleString()}원
                  </span>
                  <span className={`${styles.ratio} ${getUpOrDown(baseInfoData.code.ratio)}`}>
                    ({baseInfoData.code.ratio > 0 ? '+' : ''}
                    {baseInfoData.code.ratio}%)
                  </span>
                  <span className={styles.date}>{baseInfoData.code.latestDate} 기준</span>
                </div>
                <ul className={styles.priceList}>
                  <li className={styles.priceItem}>
                    <span className={styles.priceItemTitle}>추천 매수가</span>
                    <span className={styles.priceItemAmount}>
                      {!isLoading ? baseInfoData.adv.buy_price.toLocaleString() : '**,***'}원
                    </span>
                  </li>
                  <li className={styles.priceItem}>
                    <span className={styles.priceItemTitle}>목표 매도가</span>
                    <span className={styles.priceItemAmount}>
                      {!isLoading ? baseInfoData.adv.goal_price.toLocaleString() : '**,***'}원
                    </span>
                  </li>
                </ul>
              </div>
              <div className={styles.content} style={{ marginBottom: '1.2rem' }}>
                <h2 className={styles.contentTitle}>최근 주가 추이</h2>
                <figure className={styles.chartImgArea}>
                  <img src={signal1yChart.chartName} alt="차트 이미지" />
                </figure>
                {/* <ul className={styles.rateList}>
                  <li className={styles.rateItem}>
                    <span className={styles.rateTitle}>적중률</span>
                    <span
                      className={`${styles.rateNum} ${getUpOrDown(
                        signal1yChart.status?.win_rate ? signal1yChart.status.win_rate : 0
                      )}`}
                    >
                      {isLoading && '***'}
                      {!isLoading &&
                        typeof signal1yChart.status?.win_rate === 'number' &&
                        `${signal1yChart.status.win_rate}%`}
                      {!isLoading && typeof signal1yChart.status?.win_rate !== 'number' && '--.--'}
                    </span>
                  </li>
                  <li className={styles.rateItem}>
                    <span className={styles.rateTitle}>최대 수익률</span>
                    <span
                      className={`${styles.rateNum} ${getUpOrDown(
                        signal1yChart.status?.max_rate ? signal1yChart.status.max_rate : 0
                      )}`}
                    >
                      {isLoading && '***'}
                      {!isLoading &&
                        typeof signal1yChart.status?.max_rate === 'number' &&
                        `${signal1yChart.status.max_rate}%`}
                      {!isLoading && typeof signal1yChart.status?.max_rate !== 'number' && '--.--'}
                    </span>
                  </li>
                  <li className={styles.rateItem}>
                    <span className={styles.rateTitle}>누적 수익률</span>
                    <span
                      className={`${styles.rateNum} ${getUpOrDown(
                        signal1yChart.status?.total_rate ? signal1yChart.status.total_rate : 0
                      )}`}
                    >
                      {isLoading && '***'}
                      {!isLoading &&
                        typeof signal1yChart.status?.total_rate === 'number' &&
                        `${signal1yChart.status.max_rate}%`}
                      {!isLoading &&
                        typeof signal1yChart.status?.total_rate !== 'number' &&
                        '--.--'}
                    </span>
                  </li>
                </ul> */}
                <div className={styles.rassi} onClick={handleClickRassi}>
                  <figure className={styles.rassiImgArea}>
                    <img src="/images/detail/rassi.png" alt="라씨 아이콘" />
                  </figure>
                  <div className={styles.rassiTextContent}>
                    <span className={styles.rassiDesc}>AI기반 최적의 투자 가격대 제시해주는</span>
                    <span className={styles.rassiTitle}>투자의 비책</span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M9.29006 16.3805L13.1701 12.5005L9.29006 8.62047C8.90006 8.23047 8.90006 7.60047 9.29006 7.21047C9.68006 6.82047 10.3101 6.82047 10.7001 7.21047L15.2901 11.8005C15.6801 12.1905 15.6801 12.8205 15.2901 13.2105L10.7001 17.8005C10.3101 18.1905 9.68006 18.1905 9.29006 17.8005C8.91006 17.4105 8.90006 16.7705 9.29006 16.3805Z"
                      fill="#9FA7AE"
                    />
                  </svg>
                </div>
              </div>
              <div className={styles.content}>
                <h2 className={styles.contentTitle}>투자포인트</h2>
                {!isLoading && (
                  <div className={styles.contArea}>
                    <h3 className={styles.contTitle}>{baseInfoData.adv.cont1}</h3>
                    <ul className={styles.contList}>
                      {baseInfoData.adv?.cont2 && (
                        <li className={styles.contItem}>{baseInfoData.adv.cont2}</li>
                      )}
                      {baseInfoData.adv?.cont3 && (
                        <li className={styles.contItem}>{baseInfoData.adv.cont3}</li>
                      )}
                      {baseInfoData.adv?.cont4 && (
                        <li className={styles.contItem}>{baseInfoData.adv.cont4}</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
              <div className={styles.todaysPickArea}>
                <h2 className={styles.contentTitle}>오늘의 추천 종목</h2>
                <div className={styles.stockList}>
                  {todaysPickList &&
                    todaysPickList.map((item, index) => (
                      <div
                        className={styles.stockItem}
                        key={index}
                        onClick={() => {
                          handleClickTodaysPick(item.stock_code, item.pms_code)
                        }}
                      >
                        {!getInactiveStock(item.stock_code) ? (
                          <>
                            <span className={styles.activeTitle}>
                              추천 종목을
                              <br />
                              확인해보세요
                            </span>
                            <div className={styles.activeButtonArea}>
                              <button className={styles.activeButton}>확인하기</button>
                              <span className={styles.pointLabel}>5P</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <span className={styles.inactiveTitle}>{item.stock_name}</span>
                            <div
                              className={`${styles.inactiveContent} ${
                                getBaseInfo(item.stock_code)?.code.ratio! < 0 ? 'minus' : 'plus'
                              }`}
                            >
                              <span className={styles.inactivePrice}>
                                {getBaseInfo(item.stock_code)?.code.curPrice.toLocaleString()}원
                              </span>
                              <span className={styles.inactiveRatio}>
                                ({getBaseInfo(item.stock_code)?.code.ratio! > 0 ? '+' : ''}
                                {getBaseInfo(item.stock_code)?.code.ratio}%)
                              </span>
                            </div>
                            <span className={styles.inactiveDate}>
                              {getBaseInfo(item.stock_code)?.code.latestDate} 기준
                            </span>
                          </>
                        )}
                      </div>
                    ))}
                </div>
              </div>
              <div className={styles.buttonGroup}>
                <button className={styles.button} onClick={handleClickAdvBestItemsButton}>
                  씽크풀 지난 추천 주식 성과보기
                </button>
              </div>
            </div>
          )}
      </Layout>
    </AppScreen>
  )
}
