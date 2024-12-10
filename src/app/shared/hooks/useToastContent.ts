import { create } from 'zustand'

const toastContentStore = create<{
  value: string
  setContent: (value: string) => void
}>((set) => ({
  value: '',
  setContent(value: string) {
    set({ value })
  }
}))

export const useToastContentValue = () => toastContentStore(({ value }) => value)

export const useSetToastContent = () => toastContentStore(({ setContent }) => setContent)
