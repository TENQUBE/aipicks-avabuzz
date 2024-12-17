import { style } from '@vanilla-extract/css'

export const area = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '1.2rem'
})

export const fortuneCookieImg = style({
  width: '240px',
  height: '140px',
  objectFit: 'contain',
  marginTop: '5.4rem'
})

export const title = style({
  color: '#FFF',
  fontSize: '2rem',
  fontWeight: '600',
  lineHeight: '2.8rem',
  letterSpacing: '-0.02rem'
})

export const introImgArea = style({
  position: 'relative'
})

export const tooltip = style({
  position: 'absolute',
  top: '25px',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '0.6rem 1rem',
  borderRadius: '10px',
  backgroundColor: '#FFD12B',
  fontSize: '1.3rem',
  fontWeight: '600',
  lineHeight: '1.8rem',
  letterSpacing: '-0.02rem',
  whiteSpace: 'nowrap',

  selectors: {
    '&::after': {
      content: '',
      display: 'block',
      position: 'absolute',
      left: '50%',
      bottom: '-4px',
      width: '8px',
      height: '8px',
      backgroundColor: '#FFD12B',
      transform: 'translateX(-50%) rotate(45deg)'
    }
  }
})

export const adArea = style({
  minWidth: '320px',
  minHeight: '100px'
})
