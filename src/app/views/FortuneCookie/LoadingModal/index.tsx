import * as styles from './style.css'

export default function LoadingModal() {
  return (
    <div className={styles.dimed}>
      <div className={styles.content}>
        <img
          className={styles.img}
          src="/images/fortune-cookie/fortune_cookie_intro.png"
          alt="포춘쿠키 이미지"
        />
        <p className={styles.desc}>
          모든 행운
          <br />
          끌어모으는 중
        </p>
        <div className={styles.loadingDotArea}>
          <span className={styles.loadingDot} />
          <span className={styles.loadingDot} />
          <span className={styles.loadingDot} />
          <span className={styles.loadingDot} />
        </div>
      </div>
    </div>
  )
}
