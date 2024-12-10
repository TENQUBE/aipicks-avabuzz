import { create } from 'zustand'

const deviceIdStore = create<{
  value: string
  setValue: (value: string) => void
}>((set) => ({
  value: '',
  setValue(value: string) {
    set({ value })
  }
}))

export const useDeviceIdValue = () => deviceIdStore(({ value }) => value)

export const useSetDeviceId = () => deviceIdStore(({ setValue }) => setValue)
