import { useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { ActivityComponentType } from '@stackflow/react'

import { useFlow } from '@/app/shared/libs/stackflow'
import Modal from '@/app/shared/components/Modal'
import { useActiveActivities } from '@/app/shared/hooks/useActiveActivities'
import * as styles from '@/app/views/Error/style.css'

const Error: ActivityComponentType = () => {
  const searchParams = useSearchParams()
  const activeActivities = useActiveActivities()
  const { pop } = useFlow()

  const titleRef = useRef(searchParams?.get('title'))
  const desc = useRef(searchParams?.get('desc'))

  const handleClickConfirmBtn = () => {
    pop(activeActivities.length - 1, { animate: false })
  }

  return (
    <Modal isShowCloseButton={false}>
      <div className={styles.area}>
        {titleRef.current && <h2 className={styles.title}>{titleRef.current}</h2>}
        {desc.current && (
          <p
            className={styles.desc}
            dangerouslySetInnerHTML={{
              __html: desc.current
            }}
          />
        )}
        <button className={styles.button} onClick={handleClickConfirmBtn}>
          확인
        </button>
      </div>
    </Modal>
  )
}

export default Error
