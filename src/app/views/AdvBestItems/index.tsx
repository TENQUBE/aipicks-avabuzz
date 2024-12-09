import { AppScreen } from '@/app/shared/libs/stackflow/basic-ui'
import { useCallback, useEffect, useState } from 'react'

import { ActivityNames, useFlow } from '@/app/shared/libs/stackflow'
import { AdvBestItemVM } from '@/modules/stock/adaptor/in/ui/vm/AdvBestItemVM'
import modules from '@/modules'
import Layout from '@/app/shared/components/Layout'
import GoogleAdsense from '@/app/shared/components/GoogleAdsense'
import * as styles from '@/app/views/AdvBestItems/style.css'

export default function AdvBestItems() {
  const { push } = useFlow()

  const [advBestItems, setAdvBestItems] = useState<AdvBestItemVM[]>([])

  function getUpOrDown(value: number) {
    if (value === 0) return 'none'
    else if (value > 0) return 'up'
    else return 'down'
  }

  function getPmsNameColor(pmsName: string) {
    switch (pmsName) {
      case '수익형':
        return { backgroundColor: 'rgba(154, 233, 171, 0.20)', color: '#0AAF2F' }
      case '안정형':
        return { backgroundColor: 'rgba(249, 148, 116, 0.20)', color: '#DD582D' }
      case '안정형':
        return { backgroundColor: 'rgba(146, 157, 251, 0.20)', color: '#2A3BC6' }
    }
  }

  function handleClickMoreButton() {
    window.open('https://tradingpoint.co.kr/')
  }

  const fetchData = useCallback(async () => {
    try {
      const advBestItems = await modules.stock.getAdvBestItems()

      const sortedAdvBestItems = advBestItems.sort(
        (prev, cur) =>
          new Date(cur.getFormattedSellDateDeal()).getTime() -
          new Date(prev.getFormattedSellDateDeal()).getTime()
      )

      setAdvBestItems(sortedAdvBestItems)
    } catch (error) {
      push(ActivityNames.Error, {
        title: '잠시 후 다시 시도해주세요',
        desc: '일시적인 오류가 발생하여<br />현재 서비스를 이용할 수 없습니다.'
      })
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <AppScreen>
      <Layout title="지난 추천 주식 성과보기" backgroundColor="#F3F6F9">
        <section className={styles.area}>
          <div className={styles.header}>
            <h2 className={styles.title}>Best 수익률</h2>
            <span className={styles.date}>최근 3개월</span>
          </div>
          <ul className={styles.list}>
            {advBestItems.map((item, index) => (
              <li className={styles.item} key={index}>
                <div className={styles.nameArea}>
                  <span className={styles.stockName}>{item.stock_name}</span>
                  <span
                    className={styles.pmsName}
                    style={{
                      backgroundColor: getPmsNameColor(item.pms_name)?.backgroundColor,
                      color: getPmsNameColor(item.pms_name)?.color
                    }}
                  >
                    {item.pms_name}
                  </span>
                </div>
                <dl>
                  <div className={styles.dealItem}>
                    <dt className={styles.dealItemKey}>거래 일자</dt>
                    <dd className={styles.dealItemValue}>{item.getFormattedSellDateDeal()}</dd>
                  </div>
                  <div className={styles.dealItem}>
                    <dt className={styles.dealItemKey}>매수가</dt>
                    <dd className={styles.dealItemValue}>{item.buy_price.toLocaleString()}원</dd>
                  </div>
                  <div className={styles.dealItem}>
                    <dt className={styles.dealItemKey}>매도가</dt>
                    <dd className={styles.dealItemValue}>
                      {item.sell_price.toLocaleString()}원
                      <span
                        className={`${styles.totalRate} ${getUpOrDown(Number(item.total_rate))}`}
                      >
                        ({getUpOrDown(Number(item.total_rate)) === 'up' && '+'}
                        {getUpOrDown(Number(item.total_rate)) === 'down' && '-'}
                        {item.total_rate}%)
                      </span>
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </section>
        <div className={styles.adArea}>
          <GoogleAdsense type="banner" />
        </div>
        {/* <button className={styles.button} onClick={handleClickMoreButton}>
          추천 종목 더보기
        </button> */}
      </Layout>
    </AppScreen>
  )
}
