import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TODAYS_PICK_UPDATED_AT_KEY } from '../config'

const todaysPickUpdatedAtStore = create(
  persist<{
    todaysPickUpdatedAt: string | null
    isRehydrated: boolean
    setTodaysPickUpdatedAt: (updateAt: string) => void
  }>(
    (set) => ({
      todaysPickUpdatedAt: null,
      isRehydrated: false,
      setTodaysPickUpdatedAt: (updateAt: string) => set(() => ({ todaysPickUpdatedAt: updateAt }))
    }),
    {
      name: TODAYS_PICK_UPDATED_AT_KEY,
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

export const useTodaysPickUpdatedAtValue = () =>
  todaysPickUpdatedAtStore(({ todaysPickUpdatedAt }) => todaysPickUpdatedAt)

export const useIsRehydratedTodaysPickUpdatedAt = () =>
  todaysPickUpdatedAtStore(({ isRehydrated }) => isRehydrated)

export const useSetTodaysPickUpdatedAt = () =>
  todaysPickUpdatedAtStore(({ setTodaysPickUpdatedAt }) => setTodaysPickUpdatedAt)
