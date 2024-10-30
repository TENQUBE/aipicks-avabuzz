import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { COUPANG_AD_WATCHED_AT_KEY, MINIMUM_COUPANG_AD_EXPOSURE_TIME } from '@/app/shared/config'

const coupangAdStore = create(
  persist<{
    watchedAt: string | null
    getIsShowCoupangAd: () => boolean
    setWatchedAt: (date: string) => void
  }>(
    (set, get) => ({
      watchedAt: null,
      getIsShowCoupangAd: () => {
        const watchedAt = get().watchedAt

        if (watchedAt) {
          return (
            new Date().getTime() - new Date(watchedAt).getTime() >= MINIMUM_COUPANG_AD_EXPOSURE_TIME
          )
        } else {
          return true
        }
      },
      setWatchedAt: (date: string) => set(() => ({ watchedAt: date }))
    }),
    { name: COUPANG_AD_WATCHED_AT_KEY }
  )
)

export const useCoupangAdWatchedAtValue = () => coupangAdStore(({ watchedAt }) => watchedAt)

export const useSetCoupangAdWatchedAt = () => coupangAdStore(({ setWatchedAt }) => setWatchedAt)

export const useGetIsShowCoupangAd = () =>
  coupangAdStore(({ getIsShowCoupangAd }) => getIsShowCoupangAd)
