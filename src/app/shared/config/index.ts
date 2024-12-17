/**
 * GA ID
 */
export const GA_ID = 'G-G28JQ8DPDP'

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
export const ADPOPCORN_AOS_APP_KEY = '978466726'
export const ADPOPCORN_IOS_APP_KEY = '437598221'

/**
 * Adpopcorn ad code
 */
export interface AdCode {
  id: string
  type: string
  slotId?: string
  placementIds: string[]
}

export const ADPOPCORN_AOS_BANNER_320X50_1 = {
  id: 'banner_320X50_1',
  type: 'banner_320X50',
  slotId: '/5932629/adpopcorn/tenqube/ga03/mo/AI_fortune_m_320x501-1_Android',
  placementIds: ['RmkOny9twJiUciQ']
}
export const ADPOPCORN_AOS_BANNER_300X250_1 = {
  id: 'native_300X250_1',
  type: 'native_300X250',
  placementIds: ['f2syYbiyQCMWANS', '9aaa0aUuuppaAwY', 'RafFPjotDRu50gn']
}
export const ADPOPCORN_AOS_RV_1 = {
  id: 'RV_1',
  type: 'RV',
  slotId: '/5932629,22108591289/adpopcorn/tenqube/ga03/mo/AI_fortune_m_Reward1-1_Android',
  placementIds: ['QuFJcs0zzpPFuiB']
}
export const ADPOPCORN_AOS_RV_2 = {
  id: 'RV_2',
  type: 'RV',
  slotId: '/5932629,22108591289/adpopcorn/tenqube/ga03/mo/AI_fortune_m_Reward1-2_Android',
  placementIds: ['NcZ4XMuNriQlzYU']
}
export const ADPOPCORN_AOS_BANNER_320X100_1 = {
  id: 'banner_320X100_1',
  type: 'banner_320X100',
  slotId: '/5932629,22108591289/adpopcorn/tenqube/ga03/mo/AI_fortune_m_320x1001-1_Android',
  placementIds: ['d1C7ChpjNtTWyfV']
}
export const ADPOPCORN_AOS_BANNER_320X100_2 = {
  id: 'banner_320X100_2',
  type: 'banner_320X100',
  slotId: '/5932629,22108591289/adpopcorn/tenqube/ga03/mo/AI_fortune_m_320x1001-2_Android',
  placementIds: ['nt2th8ssArXffn1']
}
export const ADPOPCORN_IOS_BANNER_320X50_1 = {
  id: 'banner_320X50_1',
  type: 'banner_320X50',
  slotId: '/5932629/adpopcorn/tenqube/ga03/mo/AI_fortune_m_320x501-1_iOS',
  placementIds: ['jMOdqZktia6CHZq']
}
export const ADPOPCORN_IOS_BANNER_300X250_1 = {
  id: 'native_300X250_1',
  type: 'native_300X250',
  placementIds: ['vcN809grv9GV89t', 'Cep7n9jKlwtS3NJ', 'hJlR2oyP7FiS06u']
}
export const ADPOPCORN_IOS_RV_1 = {
  id: 'RV_1',
  type: 'RV',
  slotId: '/5932629,22108591289/adpopcorn/tenqube/ga03/mo/AI_fortune_m_Reward1-1_iOS',
  placementIds: ['hAcUi4wYjN3PT9h']
}
export const ADPOPCORN_IOS_RV_2 = {
  id: 'RV_2',
  type: 'RV',
  slotId: '/5932629,22108591289/adpopcorn/tenqube/ga03/mo/AI_fortune_m_Reward1-2_iOS',
  placementIds: ['Ik4HppviuSiltmj']
}
export const ADPOPCORN_IOS_BANNER_320X100_1 = {
  id: 'banner_320X100_1',
  type: 'banner_320X100',
  slotId: '/5932629,22108591289/adpopcorn/tenqube/ga03/mo/AI_fortune_m_320x1001-1_iOS',
  placementIds: ['vGIUpdnEbvNAso8']
}
export const ADPOPCORN_IOS_BANNER_320X100_2 = {
  id: 'banner_320X100_2',
  type: 'banner_320X100',
  slotId: '/5932629,22108591289/adpopcorn/tenqube/ga03/mo/AI_fortune_m_320x1001-2_iOS',
  placementIds: ['VO7VruKu2xSsEYe']
}

export const ADPOPCORN_AOS_AD_CODE_LIST: AdCode[] = [
  ADPOPCORN_AOS_BANNER_320X50_1,
  ADPOPCORN_AOS_BANNER_300X250_1,
  ADPOPCORN_AOS_RV_1,
  ADPOPCORN_AOS_RV_2,
  ADPOPCORN_AOS_BANNER_320X100_1,
  ADPOPCORN_AOS_BANNER_320X100_2
]
export const ADPOPCORN_IOS_AD_CODE_LIST: AdCode[] = [
  ADPOPCORN_IOS_BANNER_320X50_1,
  ADPOPCORN_IOS_BANNER_300X250_1,
  ADPOPCORN_IOS_RV_1,
  ADPOPCORN_IOS_RV_2,
  ADPOPCORN_IOS_BANNER_320X100_1,
  ADPOPCORN_IOS_BANNER_320X100_2
]

export const FORTUNE_COOKIE_MESSAGES = [
  '물은 자신의 길을 스스로 찾습니다.',
  '가장 어두운 밤에도 빛은 반짝입니다.',
  '포기하지 않는 한 이길 수 있습니다.',
  '길을 잃었을 때야말로 발견할 수 있는 것들이 있습니다.',
  '가장 아름다운 꽃은 가장 어려운 토양에서 자랍니다.',
  '행복은 우리가 걷는 작은 길가에 있습니다.',
  '우리의 생각이 우리의 세계를 만듭니다.',
  '가장 큰 모험은 삶을 살아가는 것입니다.',
  '최고의 순간들은 노력과 결실의 결합에서 비롯됩니다.',
  '우리는 우리가 되고자 하는 사람이 될 수 있습니다.',
  '오늘 당신이 할 수 있는 최선을 다하세요.',
  '한 걸음 한 걸음 우리는 멀리 갈 수 있습니다.',
  '우리의 꿈은 우리의 날개입니다.',
  '실패는 성공의 어머니입니다.',
  '책임은 행동으로 나타납니다.',
  '모든 끝은 새로운 시작입니다.',
  '진정한 아름다움은 내부에서 발견됩니다.',
  '우리는 우리가 믿는 것이 됩니다.',
  '고난은 우리의 힘을 키웁니다.',
  '끝나지 않는 여행이 시작됩니다.',
  '승리는 항상 힘든 길 위에 있습니다.',
  '불가능한 것은 없습니다. 아직 시도하지 않았을 뿐입니다.',
  '어디서든 빛을 찾을 수 있습니다.',
  '최고의 방법은 스스로 만드는 것입니다.',
  '오늘은 어제보다 더 밝은 빛을 내게 될 것입니다.',
  '하늘에는 한계가 없습니다.',
  '희망은 가장 작은 씨앗에서 비롯됩니다.',
  '당신은 무엇을 믿느냐에 따라 달라집니다.',
  '성공의 비밀은 결코 포기하지 않는 것입니다.',
  '포기하지 않으면 항상 가능성이 있습니다.',
  '내일의 성공은 오늘의 노력에서 시작됩니다.',
  '가장 놀라운 모험은 자기 자신을 발견하는 것입니다.',
  '어떤 것도 당신을 멈추게 할 수 없습니다.',
  '우리의 선택이 우리의 운명을 결정합니다.',
  '성공의 가장 큰 비결은 첫번째 걸음을 내딛는 것입니다.',
  '길을 찾으려면 먼저 한 걸음을 걸어야 합니다.',
  '강한 욕망은 모든 것을 이깁니다.',
  '최고는 항상 자신의 내면에 있습니다.',
  '가장 어두운 밤에도 별은 빛납니다.',
  '우리의 꿈은 우리의 희망을 반영합니다.',
  '최고의 순간은 당신이 결정하는 순간입니다.',
  '힘든 시간이 당신을 강하게 만들 것입니다.',
  '우리는 우리의 운명의 주인입니다.',
  '불가능한 것은 없습니다. 시간이 더 오래 걸릴 뿐입니다.',
  '당신이 꿈꾸는 것은 당신이 달성할 수 있는 것입니다.',
  '오늘의 희망은 내일의 성취입니다.',
  '끝나지 않는 여행은 최종 목적지가 아니라 여정 자체입니다.',
  '오늘의 노력은 내일의 보상입니다.',
  '최선을 다하고 두려워하지 마세요.',
  '강한 사람은 어려움을 견디고 강해집니다.',
  '가장 큰 위험은 아무것도 하지 않는 것입니다.',
  '가장 큰 성공은 많은 실패 뒤에 옵니다.',
  '스스로를 믿으세요.',
  '내일의 빛을 믿으세요.',
  '당신이 할 수 있는 것을 믿으세요.',
  '희망은 언제나 있고 당신은 그것의 주인입니다.',
  '가장 중요한 것은 끝내지 않고 계속하는 것입니다.',
  '새로운 기회가 문 앞에 있습니다.',
  '오늘은 행운의 날입니다.',
  '당신의 미래는 밝습니다.',
  '성공은 고난과 함께 옵니다.',
  '당신은 다른 사람들을 영감을 주는 사람입니다.',
  '매일을 감사하며 살아갑시다.',
  '불가능한 일은 없습니다.',
  '새로운 친구를 사귀게 될 것입니다.',
  '인내가 보람을 가져다 줍니다.',
  '당신은 자신을 믿을 자격이 있습니다.',
  '시간은 모든 상처를 치유합니다.',
  '당신의 미래는 밝고 희망차게 보입니다.',
  '마음이 편안한 순간을 찾아보세요.',
  '당신의 열정이 성공을 이루는 데 도움이 될 것입니다.',
  '오늘은 어제보다 나은 날입니다.',
  '당신은 소중한 존재입니다.',
  '다른 사람들에게 도움이 되는 일을 해보세요.',
  '당신의 미래는 빛나고 있습니다.',
  '목표를 설정하고 그를 향해 나아가세요.',
  '좋은 친구들과 함께하는 시간을 즐기세요.',
  '당신은 미래를 바꿀 수 있는 힘을 가지고 있습니다.',
  '가장 큰 성취는 스스로를 이기는 것입니다.',
  '오늘은 새로운 시작입니다.',
  '자신을 사랑하며 자신을 받아들이세요.',
  '지혜는 경험을 통해 얻어집니다.',
  '가장 어둡고 험한 순간에도 희망을 갖으세요.',
  '실수는 성장의 기회입니다.',
  '성공은 노력에 대한 보상입니다.',
  '당신의 꿈을 따라가세요.',
  '가장 중요한 것은 가족과 사랑입니다.',
  '자신을 믿으면 어떤 어려움도 이길 수 있습니다.',
  '새로운 경험을 기다리세요.',
  '당신은 미소 짓는 얼굴이 어울립니다.',
  '다른 사람을 존중하고 배려하세요.',
  '당신의 열정을 쫓아가세요.',
  '미래를 위한 계획을 세우세요.',
  '단단한 결심이 모든 어려움을 이길 것입니다.',
  '인생은 모험이 가득한 여행입니다.',
  '자신을 발전시키는 노력을 게을리하지 마세요.',
  '실현되지 않은 꿈을 따라가세요.',
  '성공을 위해 끊임없이 노력하세요.',
  '자신을 위한 시간을 가져보세요.',
  '당신은 특별한 존재입니다.',
  '긍정적인 생각은 긍정적인 결과를 낳습니다.',
  '오늘을 최선을 다해 살아갑시다.',
  '행복은 마음의 상태입니다.',
  '가장 중요한 것은 지금 이 순간입니다.',
  '새로운 기회를 찾아보세요.',
  '사랑은 모든 것을 이길 수 있는 힘입니다.',
  '다른 사람을 믿고 의지하세요.',
  '시험의 진정한 목적은 시험 공부를 하는 동안 이미 이루어졌다.',
  '오늘이 변하지 않으면, 당신의 1년 후도 변하지 않습니다.'
]
