import { create } from 'zustand'

const isLoadedAdpopcornScriptStore = create<{
  value: boolean | null
  setValue: (isLoaded: boolean) => void
}>((set) => ({
  value: null,
  setValue: (value) => set(() => ({ value }))
}))

export const useIsLoadedAdpopcornScriptValue = () =>
  isLoadedAdpopcornScriptStore((state) => state.value)

export const useSetIsLoadedAdpopcornScript = () =>
  isLoadedAdpopcornScriptStore((state) => state.setValue)
