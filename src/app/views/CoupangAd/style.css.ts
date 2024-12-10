import { style } from '@vanilla-extract/css'

export const area = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '2.4rem 2rem',
  boxShadow: '0px 3px 15px 0px rgba(0, 0, 0, 0.08)'
})

export const productName = style({
  width: '100%',
  marginBottom: '1.6rem',
  display: '-webkit-box',
  overflow: 'hidden',
  fontSize: '1.6rem',
  fontWeight: '600',
  lineHeight: '2.2rem',
  textOverflow: 'ellipsis',
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical'
})

export const adArea = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '240px',
  width: '100%',
  height: '220px',
  marginBottom: '1.6rem',
  borderRadius: '20px',
  overflow: 'hidden'
})

export const adText = style({
  position: 'absolute',
  top: '12px',
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

export const productImg = style({
  width: '100%',
  height: '100%',
  objectFit: 'contain'
})

export const adDesc = style({
  fontSize: '1.2rem',
  color: '#5E6265',
  textAlign: 'center'
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

export const confirmButton = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '1.2rem',
  width: '100%',
  height: '48px',
  borderRadius: '50px',
  backgroundColor: '#0768DD',
  fontSize: '1.6rem',
  fontWeight: '600',
  color: '#fff'
})
