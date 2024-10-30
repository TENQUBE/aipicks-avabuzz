import { style } from '@vanilla-extract/css'

export const area = style({
  position: 'relative',
  width: '100%',
  height: '100%'
})

export const adText = style({
  position: 'absolute',
  top: '12px',
  right: '20px',
  zIndex: '4',
  padding: '0.2rem 0.8rem',
  borderRadius: '40px',
  backgroundColor: 'rgba(90, 90, 90, 0.65)',
  color: '#fff',
  fontSize: '1rem',
  fontWeight: '500',
  lineHeight: '1.4rem',
  letterSpacing: '-0.02rem'
})

export const googleAd = style({
  zIndex: '1'
})

export const goldboxArea = style({
  display: 'none'
})

export const goldbox = style({
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: '2',
  width: '100%',
  height: '100%',
  objectFit: 'contain',

  selectors: {
    '&.overwrap': {
      zIndex: '3'
    }
  }
})
