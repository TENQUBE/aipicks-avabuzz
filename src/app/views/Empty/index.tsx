import { ActivityComponentType } from '@stackflow/react'
import { useFlow } from '@/app/shared/libs/stackflow'

import * as styles from './style.css'

const Empty: ActivityComponentType = () => {
  const { pop } = useFlow()

  return (
    <div
      className={styles.area}
      onClick={() => {
        pop(1, { animate: false })
      }}
    />
  )
}

export default Empty
