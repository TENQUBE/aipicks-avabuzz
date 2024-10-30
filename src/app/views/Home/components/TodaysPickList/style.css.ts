import { globalStyle, style } from '@vanilla-extract/css'

export const swiper = style({
  height: '100%',
  width: '256px !important',
  overflow: 'visible'
})

export const slide = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: '2.4rem',
  borderRadius: '20px',
  backgroundColor: '#FFF',
  boxShadow: '2px 4px 20px 0px rgba(0, 0, 0, 0.08)',

  selectors: {
    '&.active': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }
})

export const inactiveContent = style({
  flex: '1 0 0',
  display: 'flex',
  flexDirection: 'column',
  width: '100%'
})

export const inactiveSector = style({
  marginBottom: '0.8rem',
  color: '#5E6265',
  fontSize: '1.4rem',
  lineHeight: '2rem',
  letterSpacing: '-0.02rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
})

export const inactiveName = style({
  marginBottom: '0.2rem',
  fontSize: '1.6rem',
  fontWeight: '600',
  lineHeight: '2.3rem',
  letterSpacing: '-0.02rem'
})

export const baseInfoArea = style({})

export const price = style({
  marginBottom: '0.8rem',
  fontSize: '2.4rem',
  fontWeight: '700',
  lineHeight: '3.2rem'
})
globalStyle(`${baseInfoArea}.plus ${price}`, {
  color: '#D92A21'
})
globalStyle(`${baseInfoArea}.minus ${price}`, {
  color: '#0A80F1'
})

export const baesInfoCodeArea = style({
  marginBottom: '1.7rem',
  display: 'flex',
  alignItems: 'center',
  color: '#5E6265',
  fontSize: '1.4rem',
  lineHeight: '2rem'
})

export const baesInfoCodeAreaIcon = style({
  marginLeft: '0.4rem'
})

export const flunt = style({
  marginRight: '0.2rem',
  fontSize: '1.4rem',
  lineHeight: '2rem'
})
globalStyle(`${baseInfoArea}.plus ${flunt}`, {
  color: '#D92A21'
})
globalStyle(`${baseInfoArea}.minus ${flunt}`, {
  color: '#0A80F1'
})

export const ratio = style({
  fontSize: '1.4rem',
  lineHeight: '2rem'
})
globalStyle(`${baseInfoArea}.plus ${ratio}`, {
  color: '#D92A21'
})
globalStyle(`${baseInfoArea}.minus ${ratio}`, {
  color: '#0A80F1'
})

export const lockImgArea = style({
  position: 'relative',
  width: '80px',
  height: '80px',
  marginBottom: '1.6rem'
})

export const chartImgArea = style({
  position: 'relative',
  flex: '1 0 0',
  marginBottom: '1.5rem'
})
globalStyle(`${chartImgArea} > img`, {
  objectFit: 'contain'
})

export const point = style({
  position: 'absolute',
  bottom: '0',
  right: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '26px',
  height: '26px',
  borderRadius: '50%',
  backgroundColor: '#FF8A00',
  color: '#FFF',
  fontSize: '1.2rem',
  fontWeight: '700'
})

export const activeDesc = style({
  marginBottom: '2.3rem',
  textAlign: 'center',
  fontSize: '1.8rem',
  fontWeight: '600',
  lineHeight: '2.4rem'
})

export const activeSector = style({
  color: '#0768DD',
  fontSize: '1.8rem',
  fontWeight: '600',
  lineHeight: '2.4rem'
})

export const button = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50px'
})
globalStyle(`${slide}.inactive ${button}`, {
  width: '100%',
  padding: '1.3rem 0',
  backgroundColor: '#E2F1FF'
})
globalStyle(`${slide}.active  ${button}`, {
  padding: '1.3rem 2.4rem',
  backgroundColor: '#0768DD'
})

export const buttonText = style({
  color: '#fff',
  fontSize: '1.6rem',
  fontWeight: '600',
  lineHeight: '2.3rem',
  letterSpacing: '-0.02rem'
})
globalStyle(`${slide}.inactive ${buttonText}`, {
  color: '#253FEB'
})
globalStyle(`${slide}.active  ${buttonText}`, {
  color: '#fff'
})

export const icon = style({
  width: '24px',
  height: '24px'
})
