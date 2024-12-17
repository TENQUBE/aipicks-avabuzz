import { ActivityNames, useFlow } from '../../libs/stackflow'

interface FortuneCookieAdProps {
  type: 'banner' | 'modal'
  adClickCallback?: Function
}

function getAdInfo(type: 'banner' | 'modal') {
  switch (type) {
    case 'modal':
      return { src: '/images/ad/fortune-cookie-modal.png', width: 300, height: 250 }
    default:
      // banner
      return { src: '/images/ad/coupang-banner.png', width: 320, height: 100 }
  }
}

export default function FortuneCookieAd({ type, adClickCallback }: FortuneCookieAdProps) {
  const { push } = useFlow()

  const { src, width, height } = getAdInfo(type)

  function handleClickAd() {
    adClickCallback?.('fortuneCookie')

    push(ActivityNames.FortuneCookie, {})
  }

  return (
    <div onClick={handleClickAd}>
      <img src={src} alt="광고 이미지" width={width} height={height} />
    </div>
  )
}
