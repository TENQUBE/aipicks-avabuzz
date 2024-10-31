import { globalStyle, style } from '@vanilla-extract/css'

export const area = style({
  position: 'relative'
})

export const content = style({
  position: 'relative',
  display: 'flex',
  padding: '1rem 2rem',
  marginBottom: '0.6rem',
  borderRadius: '20px',
  backgroundColor: '#F3F3F3'
})

export const contentArea = style({
  flex: '1 0 0',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginRight: '1.9rem'
})

export const logoArea = style({
  display: 'flex',
  marginBottom: '0.4rem'
})

export const symbolLogoImgArea = style({
  position: 'relative',
  marginRight: '0.8rem',
  width: '18px',
  height: '18px'
})
globalStyle(`${symbolLogoImgArea} > img`, {
  width: '100%',
  height: '100%',
  objectFit: 'contain'
})

export const textLogo = style({
  color: '#5E6265',
  fontSize: '1.2rem',
  lineHeight: '1.8rem',
  letterSpacing: '-0.02rem'
})

export const productContent = style({
  display: '-webkit-box',
  overflow: 'hidden',
  fontWeight: '600',
  fontSize: '1.4rem',
  lineHeight: '2rem',
  letterSpacing: '-0.02rem',
  textAlign: 'left',
  textOverflow: 'ellipsis',
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical'
})

export const productImgArea = style({
  position: 'relative',
  width: '80px',
  height: '72px',
  borderRadius: '12px',
  backgroundColor: '#fff',
  overflow: 'hidden'
})
globalStyle(`${productImgArea} > img`, {
  width: '100%',
  height: '100%',
  objectFit: 'contain'
})

export const adText = style({
  position: 'absolute',
  bottom: '12px',
  right: '22px',
  padding: '0.2rem 0.8rem',
  backgroundColor: '#5A5A5AA6',
  borderRadius: '40px',
  color: '#fff',
  fontSize: '1rem',
  fontWeight: '500',
  lineHeight: '1.4rem',
  letterSpacing: '-0.02rem'
})

export const cuation = style({
  textAlign: 'center',
  color: '#5E6265',
  fontSize: '1.2rem',
  lineHeight: '1.8rem',
  letterSpacing: '-0.02px'
})

export const timer = style({
  position: 'absolute',
  top: '-4px',
  right: '-4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '26px',
  height: '26px',
  padding: '0.4rem 0.8rem',
  backgroundColor: '#000',
  borderRadius: '50%',
  fontSize: '1.4rem',
  fontWeight: '600',
  color: '#fff'
})
