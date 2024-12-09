import { create } from 'zustand'

import { ActivityNames } from '@/app/shared/libs/stackflow'

const activityParamsStore = create<{
  value: {
    from: ActivityNames | null
    to: ActivityNames | null
    params: any
  }
  setActivityParams: (from: ActivityNames | null, to: ActivityNames | null, params: any) => void
  clearActivityParams: () => void
}>((set) => ({
  value: {
    from: null,
    to: null,
    params: null
  },
  setActivityParams(from: ActivityNames | null, to: ActivityNames | null, params: any) {
    set({ value: { from, to, params } })
  },
  clearActivityParams() {
    set({ value: { from: null, to: null, params: null } })
  }
}))

export const useActivityParamsValue = () => activityParamsStore(({ value }) => value)

export const useSetActivityParams = () =>
  activityParamsStore(({ setActivityParams }) => setActivityParams)

export const useClearActivityParams = () =>
  activityParamsStore(({ clearActivityParams }) => clearActivityParams)
