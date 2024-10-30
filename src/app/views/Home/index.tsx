import { ActivityNames, useFlow } from '@/app/shared/libs/stackflow'
import { AppScreen } from '@/app/shared/libs/stackflow/basic-ui'
import Layout from '@/app/shared/components/Layout'
import TodaysPickList from '@/app/views/Home/components/TodaysPickList'
import * as styles from '@/app/views/Home/style.css'

export default function Home() {
  const { push } = useFlow()

  function handleClickButton() {
    push(ActivityNames.AdvBestItems, {})
  }

  return (
    <AppScreen>
      <Layout backgroundColor="#F8F9FF">
        <section className={styles.area}>
          <header className={styles.header}>
            <h1 className={styles.title}>
              오늘의 추천 종목
              <br />
              확인해보세요!
            </h1>
            <p className={styles.desc}>
              투자비서 라씨가
              <br />
              추천 종목을 골라줄거에요
            </p>
          </header>

          <div className={styles.listArea}>
            <TodaysPickList />
          </div>

          <button className={styles.button} onClick={handleClickButton}>
            씽크풀 지난 추천 주식 성과보기
          </button>
        </section>
      </Layout>
    </AppScreen>
  )
}
