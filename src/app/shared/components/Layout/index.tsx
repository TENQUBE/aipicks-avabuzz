import { PropsWithChildren } from 'react'

import { useFlow } from '@/app/shared/libs/stackflow'
import GoogleAdsense from '@/app/shared/components/GoogleAdsense'
import { useActiveActivities } from '@/app/shared/hooks/useActiveActivities'
import * as styles from '@/app/shared/components/Layout/style.css'

interface LayoutProps {
  title?: string
  backgroundColor?: string
  hasTopBar?: boolean
}

export default function Layout({
  children,
  title,
  backgroundColor = '#fff',
  hasTopBar = true
}: PropsWithChildren<LayoutProps>) {
  const { pop } = useFlow()
  const activeActivies = useActiveActivities()

  function handleClickBackButton() {
    pop()
  }

  return (
    <div className={styles.area} style={{ backgroundColor }}>
      {title && hasTopBar && (
        <div className={styles.topBar} style={{ backgroundColor }}>
          {activeActivies.length > 0 && (
            <button className={styles.backButton} onClick={handleClickBackButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M20.8 20.95C20.5 20.95 20.2 20.85 20 20.55L12.5 13.05C12 12.55 12 11.85 12.5 11.35L20 3.85001C20.5 3.35001 21.2 3.35001 21.7 3.85001C22.2 4.35001 22.2 5.05001 21.7 5.55001L14.9 12.25L21.6 18.95C22.1 19.45 22.1 20.15 21.6 20.65C21.4 20.85 21.1 20.95 20.8 20.95Z"
                  fill="#121212"
                />
              </svg>
            </button>
          )}
          <h1 className={styles.title}>{title}</h1>
        </div>
      )}
      <div className={`${styles.content} ${hasTopBar ? 'hasTopBar' : ''}`}>{children}</div>
      <div className={styles.bottomAdBannerArea}>
        <GoogleAdsense type="floating" />
      </div>
    </div>
  )
}
