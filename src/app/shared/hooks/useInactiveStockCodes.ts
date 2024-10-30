import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { INACTIVE_STOCK_CODE_KEY } from '@/app/shared/config'

const inactiveStocksStore = create(
  persist<{
    inactiveStocks: { stockCode: string; pmsCode: string }[]
    setInactiveStocks: (stockCode: string, pmsCode: string) => void
    clearInactiveStocks: () => void
  }>(
    (set) => ({
      inactiveStocks: [],
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
    { name: INACTIVE_STOCK_CODE_KEY }
  )
)

export const useInactiveStocksValue = () =>
  inactiveStocksStore(({ inactiveStocks }) => inactiveStocks)

export const useSetInactiveStocks = () =>
  inactiveStocksStore(({ setInactiveStocks }) => setInactiveStocks)

export const useClearInactiveStocks = () =>
  inactiveStocksStore(({ clearInactiveStocks }) => clearInactiveStocks)
