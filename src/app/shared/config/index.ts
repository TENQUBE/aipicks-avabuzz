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
export const SLOT = 5964045296
