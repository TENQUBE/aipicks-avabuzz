import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Confetti from 'react-confetti-boom'
import { Swiper, SwiperSlide } from 'swiper/react'

import { AppScreen } from '@/app/shared/libs/stackflow/basic-ui'
import { useFlow } from '@/app/shared/libs/stackflow'
import { ActivityNames } from '@/app/shared/libs/stackflow'
import { BaseInfoDataVM } from '@/modules/stock/adaptor/in/ui/vm/BaseInfoDataVM'
import { Signal1yChartVM } from '@/modules/stock/adaptor/in/ui/vm/Signal1yChartVM'
import { TodayPickVM } from '@/modules/stock/adaptor/in/ui/vm/TodayPickVM'
import modules from '@/modules'
import Layout from '@/app/shared/components/Layout'
import Loading from '@/app/views/Detail/components/Loading'
import OverlayGoogleAdsense from '@/app/shared/components/OverlayGoogleAdsense'
import { useInactiveStocksValue } from '@/app/shared/hooks/useInactiveStockCodes'
import * as styles from '@/app/views/Detail/style.css'

export default function Detail() {
  const { push } = useFlow()
  const searchParams = useSearchParams()

  const inactiveStocks = useInactiveStocksValue()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isShowOverlayAd, setIsShowOverlayAd] = useState<boolean>(false)
  const [isShowToast, setIsShowToast] = useState<boolean>(false)
  const [todaysPick, setTodaysPick] = useState<TodayPickVM[] | null>(null)
  const [baseInfoData, setBaseInfoData] = useState<BaseInfoDataVM | null>(null)
  const [signal1yChart, setSignal1yChart] = useState<Signal1yChartVM | null>(null)
  const [stockInfoDataList, setStockInfoDataList] = useState<
    { stockCode: string; pmsCode: string; baseInfo: BaseInfoDataVM }[] | null
  >(null)

  const stockCode = searchParams.get('stock_code')
  const pmsCode = searchParams.get('pms_code')

  function getUpOrDown(value: number) {
    if (value === 0) return 'none'
    else if (value > 0) return 'up'
    else return 'down'
  }

  function getInactiveStock(stockCode: string) {
    return inactiveStocks.find((item) => item.stockCode === stockCode)
  }

  function getBaseInfo(stockCode: string) {
    if (!stockInfoDataList) return

    return stockInfoDataList.find((item) => item.stockCode === stockCode)?.baseInfo
  }

  const updateStockInfo = useCallback(
    async (stockCode: string, pmsCode: string) => {
      try {
        const [todaysPick, baseInfoData, signal1yChart] = await Promise.all([
          modules.stock.getTodayPicks(),
          modules.stock.getBaseInfoData(stockCode, pmsCode),
          modules.stock.getSignal1yChart(stockCode, pmsCode)
        ])

        if (inactiveStocks.length > 0) {
          async function getStockInfoData(stockCode: string, pmsCode: string) {
            const baseInfo = await modules.stock.getBaseInfoData(stockCode, pmsCode)

            return { stockCode, pmsCode, baseInfo }
          }

          const stockInfoData = await Promise.all(
            inactiveStocks.map(({ stockCode, pmsCode }) => getStockInfoData(stockCode, pmsCode))
          )

          setStockInfoDataList(stockInfoData)
        }

        setTodaysPick(todaysPick)
        setBaseInfoData(baseInfoData)
        setSignal1yChart(signal1yChart)
      } catch (error) {
        // push(ActivityNames.Error, {
        //   title: '잠시 후 다시 시도해주세요',
        //   desc: '일시적인 오류가 발생하여<br />현재 서비스를 이용할 수 없습니다.'
        // })
      }
    },
    [inactiveStocks]
  )

  function handleClickOverlayAdDim() {
    setIsShowOverlayAd(false)
  }

  function handleClickOverlayAdCloseButton() {
    setIsShowOverlayAd(false)
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

  useEffect(() => {
    if (stockCode && pmsCode) {
      updateStockInfo(stockCode, pmsCode)
    }
  }, [stockCode, pmsCode, updateStockInfo])

  useEffect(() => {
    if (!isLoading && !isShowOverlayAd) {
      setTimeout(() => {
        setIsShowToast(true)
      }, 500)
    }
  }, [isLoading, isShowOverlayAd])

  useEffect(() => {
    if (!isLoading && !isShowOverlayAd && isShowToast) {
      setTimeout(() => {
        setIsShowToast(false)
      }, 2000)
    }
  }, [isLoading, isShowToast, isShowOverlayAd])

  return (
    <AppScreen>
      {isShowOverlayAd && (
        <OverlayGoogleAdsense
          handleClickDim={handleClickOverlayAdDim}
          handleClickCloseButton={handleClickOverlayAdCloseButton}
        />
      )}
      {isLoading && <Loading setIsLoading={setIsLoading} setIsShowOverlayAd={setIsShowOverlayAd} />}
      <>
        {isShowToast && (
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
        <div className={`${styles.toast} ${isShowToast ? 'open' : 'close'}`}>
          <figure className={styles.coinImg}>
            <Image src="/images/detail/coin.png" alt="코인 이미지" fill objectFit="contain" />
          </figure>
          <span className={styles.toastContent}>2 포인트 적립 완료!</span>
        </div>
      </>
      <Layout title="오늘의 추천 종목" backgroundColor="#fff">
        {baseInfoData && signal1yChart && (
          <div className={styles.area}>
            <div className={styles.content}>
              <span className={styles.code}>{baseInfoData?.code.stock_code}</span>
              <span className={styles.name}>{baseInfoData?.code.stock_name}</span>
              <span className={`${styles.price} ${getUpOrDown(baseInfoData.code.ratio)}`}>
                {baseInfoData?.code.curPrice.toLocaleString()}원
              </span>
              <div className={styles.fluntArea}>
                <span className={`${styles.fluntAmount} ${getUpOrDown(baseInfoData.code.ratio)}`}>
                  {baseInfoData.code.fluct_amt.toLocaleString()}원
                </span>
                <span className={`${styles.ratio} ${getUpOrDown(baseInfoData.code.ratio)}`}>
                  ({baseInfoData.code.ratio}%)
                </span>
                <span className={styles.date}>{baseInfoData.code.latestDate} 기준</span>
              </div>

              <ul className={styles.priceList}>
                <li className={styles.priceItem}>
                  <span className={styles.priceItemTitle}>매수가</span>
                  <span className={styles.priceItemAmount}>
                    {baseInfoData.adv.buy_price.toLocaleString()}원
                  </span>
                </li>
                <li className={styles.priceItem}>
                  <span className={styles.priceItemTitle}>목표가</span>
                  <span className={styles.priceItemAmount}>
                    {baseInfoData.adv.goal_price.toLocaleString()}원
                  </span>
                </li>
              </ul>
            </div>

            <div className={styles.content} style={{ marginBottom: '1.2rem' }}>
              <h2 className={styles.contentTitle}>최근 1년 매매 신호</h2>
              <figure className={styles.chartImg}>
                <Image src={signal1yChart.chartName} alt="차트 이미지" fill objectFit="contain" />
              </figure>
              <ul className={styles.rateList}>
                <li className={styles.rateItem}>
                  <span className={styles.rateTitle}>적중률</span>
                  <span
                    className={`${styles.rateNum} ${getUpOrDown(
                      signal1yChart.status ? signal1yChart.status.win_rate! : 0
                    )}`}
                  >
                    {signal1yChart.status ? signal1yChart.status.win_rate : '--.--'}%
                  </span>
                </li>
                <li className={styles.rateItem}>
                  <span className={styles.rateTitle}>최대 수익률</span>
                  <span
                    className={`${styles.rateNum} ${getUpOrDown(
                      signal1yChart.status ? signal1yChart.status.max_rate! : 0
                    )}`}
                  >
                    {signal1yChart.status ? signal1yChart.status.max_rate : '--.--'}%
                  </span>
                </li>
                <li className={styles.rateItem}>
                  <span className={styles.rateTitle}>누적 수익률</span>
                  <span
                    className={`${styles.rateNum} ${getUpOrDown(
                      signal1yChart.status ? signal1yChart.status.total_rate! : 0
                    )}`}
                  >
                    {signal1yChart.status ? signal1yChart.status.total_rate! : '--.--'}%
                  </span>
                </li>
              </ul>

              <div className={styles.rassi} onClick={handleClickRassi}>
                <figure className={styles.rassiImgArea}>
                  <Image src="/images/detail/rassi.png" alt="라씨 아이콘" fill />
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
            </div>

            <div className={styles.todaysPickArea}>
              <h2 className={styles.contentTitle}>오늘의 추천 종목</h2>
              <Swiper
                spaceBetween={12}
                slidesPerView="auto"
                className={styles.swiper}
                slideClass={styles.slide}
              >
                {todaysPick &&
                  inactiveStocks &&
                  todaysPick.map((item, index) => (
                    <SwiperSlide className={styles.slide} key={index}>
                      {!getInactiveStock(item.stock_code) ? (
                        <>
                          <span className={styles.activeTitle}>
                            추천 종목을
                            <br />
                            확인해보세요
                          </span>
                          <div className={styles.activeButtonArea}>
                            <button
                              className={styles.activeButton}
                              onClick={() => {
                                handleClickTodaysPick(item.stock_code, item.pms_code)
                              }}
                            >
                              확인하기
                            </button>
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
                              {getBaseInfo(item.stock_code)?.code.ratio! > 0 && '+'}
                              {getBaseInfo(item.stock_code)?.code.ratio}%
                            </span>
                          </div>
                          <span className={styles.inactiveDate}>
                            {getBaseInfo(item.stock_code)?.code.latestDate} 기준
                          </span>
                        </>
                      )}
                    </SwiperSlide>
                  ))}
              </Swiper>
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
