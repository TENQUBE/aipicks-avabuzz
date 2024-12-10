/**
 * stackflow
 */
export const ANIMATION_DURATION = 400
export const MODAL_ANIMATION_DURATION = 600

/**
 * localStroage key
 */
export const INACTIVE_STOCK_CODE_KEY = 'inactive_stock_codes_key'
export const TODAYS_PICK_UPDATED_AT_KEY = 'todays_pick_updated_at'
export const COUPANG_AD_WATCHED_AT_KEY = 'coupang_ad_watched_at'

/**
 * thinkpool api url
 */
export const API_URL = 'https://serviceapi.thinkpool.com/tenqube'

/**
 * coupang partners
 */
export const GOLDBOX_URL = 'https://link.coupang.com/a/bGogTm'
export const SECRET_KEY = process.env.NEXT_PUBLIC_COUPANG_PARTNERS_API_SECRET_KEY
export const ACCESS_KEY = process.env.NEXT_PUBLIC_COUPANG_PARTNERS_API_ACCESS_KEY
export const MINIMUM_COUPANG_AD_EXPOSURE_TIME =
  process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 10 * 1000 : 2 * 60 * 60 * 1000

/**
 * google adsence
 */
export const SLOT = 9052166035
export const CLIENT_ID = 'ca-pub-4440358116924496'

/**
 * Adpopcorn app_key
 */
export const ADPOPCORN_AOS_APP_KEY = '305624554'
export const ADPOPCORN_IOS_APP_KEY = '878124826'

/**
 * Adpopcorn ad code
 */
export interface AdCode {
  id: string
  type: string
  slotId?: string
  placementId: string
}

export const ADPOPCORN_AOS_BANNER_320X50_1 = {
  id: 'banner_320X50_1',
  type: 'banner_320X50',
  placementId: '1QmYWFIWSRujfoT'
}
export const ADPOPCORN_AOS_BANNER_320X100_1 = {
  id: 'banner_320X100_1',
  type: 'banner_320X100',
  slotId: '/5932629/ca-pub-1474238860523410-tag/Buzz_fortune_m_320x1001-1_Android',
  placementId: 'fUpQVfj6LJFwyYW'
}
export const ADPOPCORN_AOS_BANNER_300X250_1 = {
  id: 'banner_300X250_1',
  type: 'banner_300X250',
  placementId: 'ELwDyavm4NNj5BH'
}
export const ADPOPCORN_IOS_BANNER_320X50_1 = {
  id: 'banner_320X50_1',
  type: 'banner_320X50',
  placementId: 'FfwquKFvuIh10RS'
}
export const ADPOPCORN_IOS_BANNER_320X100_1 = {
  id: 'banner_320X100_1',
  type: 'banner_320X100',
  slotId: '/5932629/ca-pub-1474238860523410-tag/Buzz_fortune_m_320x1001-1_iOS',
  placementId: 'ncrjlZdP8fW8hmA'
}
export const ADPOPCORN_IOS_BANNER_300X250_1 = {
  id: 'banner_300X250_1',
  type: 'banner_300X250',
  placementId: 'MimRDjW5WAt3VlK'
}
export const ADPOPCORN_AOS_AD_CODE_LIST: AdCode[] = [
  ADPOPCORN_AOS_BANNER_320X50_1,
  ADPOPCORN_AOS_BANNER_320X100_1,
  ADPOPCORN_AOS_BANNER_300X250_1
]
export const ADPOPCORN_IOS_AD_CODE_LIST: AdCode[] = [
  ADPOPCORN_IOS_BANNER_320X50_1,
  ADPOPCORN_IOS_BANNER_320X100_1,
  ADPOPCORN_IOS_BANNER_300X250_1
]
