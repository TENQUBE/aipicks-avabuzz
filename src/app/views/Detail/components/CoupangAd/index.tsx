import { MouseEventHandler } from 'react'
import Image from 'next/image'

import { CoupangData } from '@/modules/ad/domain/Coupang'
import * as styles from '@/app/views/Detail/components/CoupangAd/style.css'

interface CoupangAdProps {
  skipSeconds: number
  data: CoupangData
  isFinishedLoading: boolean
  handleClickConfirmButton: MouseEventHandler
  handleClickCloseButton: MouseEventHandler
}

export default function CoupangAd({
  skipSeconds,
  data,
  isFinishedLoading,
  handleClickConfirmButton,
  handleClickCloseButton
}: CoupangAdProps) {
  return (
    <div className={styles.area}>
      <div className={styles.content} onClick={handleClickConfirmButton}>
        <div className={styles.contentArea}>
          <div className={styles.logoArea}>
            <figure className={styles.symbolLogoImg}>
              <Image
                src="/images/ad/coupang-symbol-logo.png"
                alt="쿠팡 심볼 로고 이미지"
                fill
                objectFit="contain"
              />
            </figure>
            <span className={styles.textLogo}>쿠팡</span>
          </div>
          <p className={styles.productContent}>{data.productName}</p>
        </div>
        <div>
          <figure className={styles.productImg}>
            <Image src={data.productImage} alt="상품 이미지" fill objectFit="contain" />
          </figure>
          <span className={styles.adText}>AD</span>
        </div>
      </div>
      <p className={styles.cuation}>
        이 포스팅은 쿠팡 파트너스 활동의 일환으로,
        <br />
        이에 따른 일정액의 수수료를 제공받습니다.
      </p>

      <span
        className={styles.timer}
        onClick={(event) => {
          event.stopPropagation()

          if (skipSeconds === 0) {
            handleClickCloseButton(event)
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
    </div>
  )
}
