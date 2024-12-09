import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { INACTIVE_STOCK_CODE_KEY } from '@/app/shared/config'

const inactiveStocksStore = create(
  persist<{
    inactiveStocks: { stockCode: string; pmsCode: string }[]
    isRehydrated: boolean
    setInactiveStocks: (stockCode: string, pmsCode: string) => void
    clearInactiveStocks: () => void
  }>(
    (set) => ({
      inactiveStocks: [],
      isRehydrated: false,
      setInactiveStocks: (stockCode: string, pmsCode: string) =>
        set((state) => {
          const newInactiveStocks = [...state.inactiveStocks, { stockCode, pmsCode }]

          return {
            inactiveStocks: newInactiveStocks.filter((newInactiveStock1, index) => {
              const findIndex = newInactiveStocks.findIndex(
                (newInactiveStock2) => newInactiveStock2.stockCode === newInactiveStock1.stockCode
              )

              return findIndex === index
            })
          }
        }),
      clearInactiveStocks: () => set(() => ({ inactiveStocks: [] }))
    }),
    {
      name: INACTIVE_STOCK_CODE_KEY,
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            state.isRehydrated = true
          }
        }
      }
    }
  )
)

export const useInactiveStocksValue = () =>
  inactiveStocksStore(({ inactiveStocks }) => inactiveStocks)

export const useIsRehydratedInactiveStock = () =>
  inactiveStocksStore(({ isRehydrated }) => isRehydrated)

export const useSetInactiveStocks = () =>
  inactiveStocksStore(({ setInactiveStocks }) => setInactiveStocks)

export const useClearInactiveStocks = () =>
  inactiveStocksStore(({ clearInactiveStocks }) => clearInactiveStocks)
