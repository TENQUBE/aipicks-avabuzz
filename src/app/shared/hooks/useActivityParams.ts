import { create } from 'zustand'

import { ActivityNames } from '@/app/shared/libs/stackflow'

const activityParamsStore = create<{
  value: {
    from: ActivityNames | null
    to: ActivityNames | null
    params: any
  }
  setValue: (from: ActivityNames | null, to: ActivityNames | null, params: any) => void
  clearValue: () => void
}>((set) => ({
  value: {
    from: null,
    to: null,
    params: null
  },
  setValue(from: ActivityNames | null, to: ActivityNames | null, params: any) {
    set({ value: { from, to, params } })
  },
  clearValue() {
    set({ value: { from: null, to: null, params: null } })
  }
}))

export const useActivityParamsValue = () => activityParamsStore(({ value }) => value)

export const useSetActivityParams = () => activityParamsStore(({ setValue }) => setValue)

export const useClearActivityParams = () => activityParamsStore(({ clearValue }) => clearValue)
