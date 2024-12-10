import { create } from 'zustand'

const isAdBlockStore = create<{
  value: boolean | null
  setValue: (value: boolean) => void
}>((set) => ({
  value: null,
  setValue(value: boolean) {
    set({ value })
  }
}))

export const useIsAdBlock = () => isAdBlockStore(({ value }) => value)

export const useSetIsAdBlock = () => isAdBlockStore(({ setValue }) => setValue)
