import { create } from 'zustand'

const isLoadedGoogleAdSenseScriptStore = create<{
  value: boolean | null
  setValue: (value: boolean) => void
}>((set) => ({
  value: null,
  setValue: (value) => set(() => ({ value }))
}))

export const useIsLoadedGoogleAdsenseScriptValue = () =>
  isLoadedGoogleAdSenseScriptStore((state) => state.value)

export const useSetIsLoadedGoogleAdsenseScript = () =>
  isLoadedGoogleAdSenseScriptStore((state) => state.setValue)
