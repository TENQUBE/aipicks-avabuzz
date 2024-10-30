import { create } from 'zustand'

const googleAdsenseScriptLoadStatusStore = create<{
  status: 'pending' | 'resolved' | 'rejected'
  setGoogleAdsenseScriptLoadStatus: (status: 'pending' | 'resolved' | 'rejected') => void
}>((set) => ({
  status: 'pending',
  setGoogleAdsenseScriptLoadStatus: (status) => set(() => ({ status }))
}))

export const useGoogleAdScriptLoadStatusValue = () =>
  googleAdsenseScriptLoadStatusStore((state) => state.status)

export const useSetGoogleAdsenseScriptLoadStatus = () =>
  googleAdsenseScriptLoadStatusStore((state) => state.setGoogleAdsenseScriptLoadStatus)
