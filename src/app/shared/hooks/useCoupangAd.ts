import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { COUPANG_AD_WATCHED_AT_KEY, MINIMUM_COUPANG_AD_EXPOSURE_TIME } from '@/app/shared/config'

const coupangAdStore = create(
  persist<{
    watchedAt: string | null
    isSeeCoupang: boolean | null
    defaultAdType: 'googleAdsense' | 'fortuneCookie' | null
    getIsShowCoupangAd: () => boolean
    setWatchedAt: (date: string) => void
    setIsSeeCoupang: (isSeeCoupang: boolean) => void
    setDefaultAdType: (defaultAdType: 'googleAdsense' | 'fortuneCookie') => void
  }>(
    (set, get) => ({
      watchedAt: null,
      isSeeCoupang: null,
      defaultAdType: null,
      getIsShowCoupangAd: () => {
        const isSeeCoupang = get().isSeeCoupang

        if (!isSeeCoupang) return false

        const watchedAt = get().watchedAt

        if (watchedAt) {
          return (
            new Date().getTime() - new Date(watchedAt).getTime() >= MINIMUM_COUPANG_AD_EXPOSURE_TIME
          )
        } else {
          return true
        }
      },
      setWatchedAt: (date: string) => set(() => ({ watchedAt: date })),
      setIsSeeCoupang: (isSeeCoupang: boolean) => set(() => ({ isSeeCoupang })),
      setDefaultAdType: (defaultAdType: 'googleAdsense' | 'fortuneCookie') =>
        set(() => ({ defaultAdType }))
    }),
    { name: COUPANG_AD_WATCHED_AT_KEY }
  )
)

export const useCoupangAdWatchedAtValue = () => coupangAdStore(({ watchedAt }) => watchedAt)

export const useSetCoupangAdWatchedAt = () => coupangAdStore(({ setWatchedAt }) => setWatchedAt)

export const useGetIsShowCoupangAd = () =>
  coupangAdStore(({ getIsShowCoupangAd }) => getIsShowCoupangAd)

export const useSetIsSeeCoupang = () => coupangAdStore(({ setIsSeeCoupang }) => setIsSeeCoupang)

export const useDefaultAdTypeValue = () => coupangAdStore(({ defaultAdType }) => defaultAdType)

export const useSetDefaultAdType = () => coupangAdStore(({ setDefaultAdType }) => setDefaultAdType)
