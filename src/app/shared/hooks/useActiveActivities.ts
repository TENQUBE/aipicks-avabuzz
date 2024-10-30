import { useStack } from '@stackflow/react'

export function useActiveActivities() {
  const stack = useStack()

  const activeActivities = stack.activities.filter(
    (activity) => !activity.transitionState.includes('exit')
  )

  return activeActivities
}
