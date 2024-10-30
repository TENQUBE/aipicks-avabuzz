import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TODAYS_PICK_UPDATED_AT_KEY } from '../config'

const todaysPickUpdatedAtStore = create(
  persist<{ todaysPickUpdatedAt: string; setTodaysPickUpdatedAt: (updateAt: string) => void }>(
    (set) => ({
      todaysPickUpdatedAt: new Date().toISOString(),
      setTodaysPickUpdatedAt: (updateAt: string) => set(() => ({ todaysPickUpdatedAt: updateAt }))
    }),
    { name: TODAYS_PICK_UPDATED_AT_KEY }
  )
)

export const useTodaysPickUpdatedAtValue = () =>
  todaysPickUpdatedAtStore(({ todaysPickUpdatedAt }) => todaysPickUpdatedAt)

export const useSetTodaysPickUpdatedAt = () =>
  todaysPickUpdatedAtStore(({ setTodaysPickUpdatedAt }) => setTodaysPickUpdatedAt)
