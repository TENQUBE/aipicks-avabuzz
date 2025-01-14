import { globalStyle, style, keyframes } from '@vanilla-extract/css'

export const confettiArea = style({
  position: 'relative',
  zIndex: '1'
})

export const confettiContent = style({
  position: 'absolute',
  top: '10px',
  left: '50% ',
  zIndex: '2',
  transform: 'translate(-50%, 30px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  opacity: '0',
  transition: 'opacity 0.5s, transform 0.5s',

  selectors: {
    '&.open': {
      opacity: '1',
      transform: 'translate(-50%, 0px)'
    },
    '&.close': {
      opacity: '0',
      transform: 'translate(-50%, 30px)'
    }
  }
})

export const coinImgArea = style({
  position: 'relative',
  width: '56px',
  height: '56px',
  marginBottom: '0.8rem'
})

globalStyle(`${coinImgArea} > img`, {
  width: '100%',
  height: '100%',
  objectFit: 'contain'
})

export const confettiTextContent = style({
  padding: '1.2rem 2rem',
  borderRadius: '24px',
  backgroundColor: '#FFF',
  boxShadow: '2px 2px 24px 0px rgba(0, 0, 0, 0.08)',
  fontSize: '1.8rem',
  fontWeight: '500',
  lineHeight: '2.4rem',
  letterSpacing: '-0.02rem',
  whiteSpace: 'nowrap'
})

export const loadingArea = style({
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: '1',
  width: '100%',
  height: '100%'
})

export const buttonBackground = style({
  position: 'absolute',
  bottom: '52px',
  left: '0',
  width: '100%',
  height: '50%',
  background: 'linear-gradient(180deg, rgba(230, 243, 255, 0) 0%, #E6F3FF 50.96%)'
})

export const loadingDesc = style({
  position: 'absolute',
  bottom: '126px',
  left: '0',
  width: '100%',
  fontSize: '1.6rem',
  lineHeight: '2.3rem',
  fontWeight: '600',
  textAlign: 'center'
})

export const loadingAreaButton = style({
  position: 'absolute',
  bottom: '64px',
  left: '20px',
  width: 'calc(100% - 4rem)',
  height: '52px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#0768DD',
  borderRadius: '50px',
  fontSize: '1.6rem',
  lineHeight: '2.2rem',
  fontWeight: '600',
  color: '#fff'
})

export const area = style({
  backgroundColor: '#F3F6F9'
})

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '3.2rem 2rem',
  backgroundColor: '#fff',

  selectors: {
    '&:last-of-type': {
      paddingBottom: '11.6rem'
    }
  }
})

export const code = style({
  marginBottom: '0.5rem',
  color: '#81878D',
  fontSize: '1.4rem',
  lineHeight: '20px',
  letterSpacing: '-0.02rem'
})

export const name = style({
  marginBottom: '0.5rem',
  fontSize: '1.8rem',
  fontWeight: '600',
  lineHeight: '2.4rem',
  letterSpacing: '-0.02rem'
})

export const price = style({
  marginBottom: '1.2rem',
  fontSize: '3.2rem',
  fontWeight: '700',
  lineHeight: '4rem',
  letterSpacing: '-0.02rem',

  selectors: {
    '&.up': {
      color: '#D92A21'
    },
    '&.down': {
      color: '#0A80F1'
    }
  }
})

export const fluntArea = style({
  marginBottom: '2rem'
})

export const fluntAmount = style({
  marginRight: '0.2rem',
  fontSize: '1.4rem',
  lineHeight: '2rem',
  letterSpacing: '-0.02rem',

  selectors: {
    '&.up': {
      color: '#D92A21'
    },
    '&.down': {
      color: '#0A80F1'
    }
  }
})

export const ratio = style({
  marginRight: '0.8rem',
  fontSize: '1.4rem',
  lineHeight: '2rem',
  letterSpacing: '-0.02rem',

  selectors: {
    '&.up': {
      color: '#D92A21'
    },
    '&.down': {
      color: '#0A80F1'
    }
  }
})

export const date = style({
  color: '#81878D',
  fontSize: '1.4rem',
  lineHeight: '2rem',
  letterSpacing: '-0.02rem'
})

export const priceList = style({
  display: 'flex',
  marginBottom: '1.2rem'
})

export const priceItem = style({
  flex: '1 0 0',
  display: 'flex',
  flexDirection: 'column',
  marginRight: '0.8rem',
  padding: '1.4rem',
  backgroundColor: '#F3F6F9',
  borderRadius: '12px',

  selectors: {
    '&:last-of-type': {
      marginRight: '0'
    }
  }
})

export const priceItemTitle = style({
  marginBottom: '0.4rem',
  color: '#5E6265',
  fontSize: '1.4rem',
  lineHeight: '2rem',
  letterSpacing: '-0.02rem'
})

export const priceItemAmount = style({
  fontSize: '1.6rem',
  fontWeight: '500',
  lineHeight: '2.3rem',
  letterSpacing: '-0.02rem'
})

export const noticeArea = style({
  display: 'flex',
  justifyContent: 'center'
})

export const noticeIcon = style({
  width: '16px',
  flexShrink: '0',
  height: '16px',
  marginRight: '0.4rem'
})

export const noticeContent = style({
  fontSize: '1.2rem',
  lineHeight: '1.8rem',
  color: '#6B7684'
})

export const contentTitle = style({
  marginBottom: '2rem',
  fontSize: '1.6rem',
  fontWeight: '600',
  lineHeight: '2.4rem',
  letterSpacing: '-0.02px'
})

export const chartImgArea = style({
  position: 'relative',
  width: '100%',
  height: '173px',
  marginBottom: '2.4rem',
  transform: 'translateX(3px)'
})
globalStyle(`${chartImgArea} > img`, {
  width: '100%',
  height: '100%',
  objectFit: 'contain'
})

export const rateList = style({
  display: 'flex',
  marginBottom: '3.2rem'
})

export const rateItem = style({
  flex: '1 0 0',
  display: 'flex',
  flexDirection: 'column',
  padding: '1.4rem',
  marginRight: '0.8rem',
  borderRadius: '12px',
  backgroundColor: '#F3F6F9',

  selectors: {
    '&:last-of-type': {
      marginRight: '0'
    }
  }
})

export const rateTitle = style({
  marginBottom: '0.4rem',
  color: '#5E6265',
  fontSize: '1.4rem',
  lineHeight: '2rem',
  letterSpacing: '-0.02rem',
  whiteSpace: 'nowrap'
})

export const rateNum = style({
  fontSize: '1.6rem',
  fontWeight: '500',
  lineHeight: '2.3rem',
  letterSpacing: '-0.02rem',

  selectors: {
    '&.up': {
      color: '#D92A21'
    },
    '&.down': {
      color: '#0A80F1'
    }
  }
})

export const rassi = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

export const rassiImgArea = style({
  position: 'relative',
  width: '40px',
  height: '40px',
  marginRight: '1.6rem'
})
globalStyle(`${rassiImgArea} > img`, {
  width: '100%',
  height: '100%',
  objectFit: 'contain'
})

export const rassiTextContent = style({
  flex: '1 0 0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
})

export const rassiDesc = style({
  marginBottom: '0.4rem',
  color: '#5E6265',
  fontSize: '1.4rem',
  lineHeight: '2rem'
})

export const rassiTitle = style({
  fontSize: '1.6rem',
  fontWeight: '600',
  lineHeight: '2.3rem'
})

export const contArea = style({
  padding: '2rem',
  backgroundColor: '#F3F6F9',
  borderRadius: '12px',
  fontSize: '1.6rem',
  lineHeight: '2.3rem',
  letterSpacing: '-0.02rem'
})

export const contTitle = style({
  marginBottom: '1.2rem',
  color: '#000',
  fontSize: '1.6rem',
  fontWeight: '600',
  lineHeight: '2.3rem',
  letterSpacing: '-0.02rem'
})

export const contList = style({
  paddingLeft: '2rem'
})

export const contItem = style({
  marginBottom: '1rem',
  color: '#2E3031',
  fontSize: '1.4rem',
  fontWeight: '400',
  lineHeight: '2rem',
  letterSpacing: '-0.02rem',
  listStyleType: 'disc',

  selectors: {
    '&:last-of-type': {
      marginBottom: '0'
    }
  }
})

export const todaysPickArea = style({
  padding: '3.2rem 2rem 4rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
})

export const stockList = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: 'calc(100% + 4rem)',
  padding: '0 2rem',
  marginLeft: '-2rem'
})

export const stockItem = style({
  flex: '1 0 0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '137px',
  padding: '2rem',
  marginRight: '1.2rem',
  borderRadius: '16px',
  backgroundColor: '#fff',

  selectors: {
    '&:last-of-type': {
      marginRight: '0'
    }
  }
})

export const activeTitle = style({
  width: '100%',
  marginBottom: '1.2rem',
  color: '#121212',
  textAlign: 'center',
  fontSize: '1.4rem',
  fontWeight: '600',
  lineHeight: '2rem'
})

export const activeButtonArea = style({
  position: 'relative',
  width: '100%'
})

export const activeButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '1rem 0',
  borderRadius: '50px',
  backgroundColor: '#0768DD',
  color: '#fff',
  fontSize: '1.4rem',
  fontWeight: '600'
})

export const pointLabel = style({
  position: 'absolute',
  top: '-8.5px',
  right: '-8.5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '26px',
  height: '26px',
  borderRadius: '50%',
  backgroundColor: '#FF8A00',
  color: '#fff',
  fontSize: '1.2rem',
  fontWeight: '700'
})

export const inactiveTitle = style({
  width: '100%',
  marginBottom: '0.8rem',
  color: '#121212',
  fontSize: '1.4rem',
  fontWeight: '500',
  lineHeight: '2rem'
})

export const inactiveContent = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '0.8rem'
})

export const inactivePrice = style({
  width: '100%',
  marginBottom: '0.2rem',
  fontSize: '1.6rem',
  fontWeight: '600',
  lineHeight: '2.3rem'
})
globalStyle(`${inactiveContent}.minus ${inactivePrice}`, {
  color: '#0A80F1'
})
globalStyle(`${inactiveContent}.plus ${inactivePrice}`, {
  color: '#D92A21'
})

export const inactiveRatio = style({
  fontSize: '1.3rem',
  lineHeight: '1.8rem'
})
globalStyle(`${inactiveContent}.minus ${inactiveRatio}`, {
  color: '#0A80F1'
})
globalStyle(`${inactiveContent}.plus ${inactiveRatio}`, {
  color: '#D92A21'
})

export const inactiveDate = style({
  width: '100%',
  color: '#81878D',
  fontSize: '1.2rem',
  lineHeight: '1.8rem'
})

export const buttonGroup = style({
  padding: '0 2rem 8rem'
})

export const button = style({
  width: '100%',
  padding: '1.7rem 0',
  borderRadius: '50px',
  backgroundColor: '#E1E6E9',
  color: '#2E3031',
  fontSize: '1.6rem',
  fontWeight: '600',
  lineHeight: '2.3rem',
  letterSpacing: '-0.02rem'
})
