import { sendGAEvent } from '@next/third-parties/google'
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
import InterstitialAd from '@/app/shared/components/AdpopcornInterstitialAd'
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
import { useSetToastContent } from '@/app/shared/hooks/useToastContent'
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
  const setToastContent = useSetToastContent()

  const [isLoading, setIsLoading] = useState<boolean | null>(null)
  const [isShowInterstitialAd, setIsShowInterstitialAd] = useState<boolean>(false)
  // const [isShowPointConfetti, setIsShowPointConfetti] = useState<boolean>(false)
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
      if (typeof window.postbackFire !== 'undefined') {
        console.log('call postbackFire')
        window.postbackFire('tenqube')
      }
    }, ANIMATION_DURATION)
    // setTimeout(() => {
    //   setIsShowPointConfetti(true)
    // }, ANIMATION_DURATION)
  }, [])

  function handleClickLoadingButton() {
    push(ActivityNames.Ad, {})
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

  // useEffect(() => {
  //   if (!isLoading && !isShowInterstitialAd && isShowPointConfetti) {
  //     setTimeout(() => {
  //       setIsShowPointConfetti(false)
  //     }, 2000)
  //   }
  // }, [isLoading, isShowInterstitialAd, isShowPointConfetti])

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
      case ActivityNames.Ad:
        if (activityParams.params.isSeenAd) {
          if (process.env.NODE_ENV === 'production') {
            sendGAEvent('event', '추천종목_참여_complete')
          }

          setInactiveStocks(stockCode, pmsCode)

          setIsLoading(false)

          setTimeout(() => {
            setIsShowInterstitialAd(true)
          }, ANIMATION_DURATION)
        } else {
          setToastContent('5초 이상 체류 후 결과 확인이 가능합니다.')
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

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || isLoading === null) return

    if (isLoading) {
      sendGAEvent('event', '랜딩')
    } else {
      sendGAEvent('event', '결과')
    }
  }, [isLoading])

  return (
    <AppScreen>
      {isShowInterstitialAd && <InterstitialAd closeCallback={interstitialAdCloseCallback} />}

      {/* <>
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
      </> */}

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
                    ? todaysPick.find((item) => item.stock_code === stockCode)?.stock_code
                    : replaceWithAsterisk(
                        todaysPick.find((item) => item.stock_code === stockCode)?.stock_code
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
                <div className={styles.noticeArea}>
                  <svg
                    className={styles.noticeIcon}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.33335 11.3333C8.52224 11.3333 8.68069 11.2693 8.80869 11.1413C8.93624 11.0138 9.00002 10.8555 9.00002 10.6667V7.98333C9.00002 7.79444 8.93624 7.63888 8.80869 7.51666C8.68069 7.39444 8.52224 7.33333 8.33335 7.33333C8.14446 7.33333 7.98624 7.39711 7.85869 7.52466C7.73069 7.65266 7.66669 7.81111 7.66669 7.99999V10.6833C7.66669 10.8722 7.73069 11.0278 7.85869 11.15C7.98624 11.2722 8.14446 11.3333 8.33335 11.3333ZM8.33335 5.99999C8.52224 5.99999 8.68069 5.93599 8.80869 5.80799C8.93624 5.68044 9.00002 5.52222 9.00002 5.33333C9.00002 5.14444 8.93624 4.98599 8.80869 4.85799C8.68069 4.73044 8.52224 4.66666 8.33335 4.66666C8.14446 4.66666 7.98624 4.73044 7.85869 4.85799C7.73069 4.98599 7.66669 5.14444 7.66669 5.33333C7.66669 5.52222 7.73069 5.68044 7.85869 5.80799C7.98624 5.93599 8.14446 5.99999 8.33335 5.99999ZM8.33335 14.6667C7.41113 14.6667 6.54446 14.4915 5.73335 14.1413C4.92224 13.7915 4.21669 13.3167 3.61669 12.7167C3.01669 12.1167 2.5418 11.4111 2.19202 10.6C1.8418 9.78888 1.66669 8.92222 1.66669 7.99999C1.66669 7.07777 1.8418 6.21111 2.19202 5.39999C2.5418 4.58888 3.01669 3.88333 3.61669 3.28333C4.21669 2.68333 4.92224 2.20822 5.73335 1.85799C6.54446 1.50822 7.41113 1.33333 8.33335 1.33333C9.25558 1.33333 10.1222 1.50822 10.9334 1.85799C11.7445 2.20822 12.45 2.68333 13.05 3.28333C13.65 3.88333 14.1249 4.58888 14.4747 5.39999C14.8249 6.21111 15 7.07777 15 7.99999C15 8.92222 14.8249 9.78888 14.4747 10.6C14.1249 11.4111 13.65 12.1167 13.05 12.7167C12.45 13.3167 11.7445 13.7915 10.9334 14.1413C10.1222 14.4915 9.25558 14.6667 8.33335 14.6667ZM8.33335 13.3333C9.81113 13.3333 11.0696 12.814 12.1087 11.7753C13.1474 10.7362 13.6667 9.47777 13.6667 7.99999C13.6667 6.52222 13.1474 5.26377 12.1087 4.22466C11.0696 3.18599 9.81113 2.66666 8.33335 2.66666C6.85558 2.66666 5.59735 3.18599 4.55869 4.22466C3.51958 5.26377 3.00002 6.52222 3.00002 7.99999C3.00002 9.47777 3.51958 10.7362 4.55869 11.7753C5.59735 12.814 6.85558 13.3333 8.33335 13.3333Z"
                      fill="#BFC6CF"
                    />
                  </svg>
                  <p className={styles.noticeContent}>
                    본 콘텐츠에서 제공되는 주식 추천 정보는
                    <br />
                    AI와 다양한 지표를 기반으로 생성된 참고용 데이터입니다.
                    <br />
                    투자에 대한 최종 결정과 책임은 전적으로 사용자 본인에게 있으며, 제공된 정보는
                    수익을 보장하지 않습니다.
                    <br />
                    신중한 판단을 부탁드립니다.
                  </p>
                </div>
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
                              {/* <span className={styles.pointLabel}>5P</span> */}
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
