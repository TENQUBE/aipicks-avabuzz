import { style } from '@vanilla-extract/css'

export const area = style({
  position: 'relative',
  margin: '0 auto',
  width: '100%',
  height: '100%',
  overflow: 'hidden'
})

export const topBar = style({
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: '1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '44px',
  padding: '0 0.8rem',
  backgroundColor: '#fff'
})

export const backButton = style({
  position: 'absolute',
  top: '50%',
  left: '8px',
  transform: 'translateY(-50%)'
})

export const title = style({
  fontSize: '1.6rem',
  fontWeight: '600',
  lineHeight: '2.3rem',
  letterSpacing: '-0.02rem'
})

export const content = style({
  position: 'absolute',
  top: '0',
  width: '100%',
  height: 'calc(100% - 52px)',
  overflowY: 'auto',

  selectors: {
    '&.hasTopBar': {
      height: 'calc(100% - 96px)',
      top: '44px'
    }
  }
})

export const bottomAdBannerArea = style({
  position: 'absolute',
  bottom: '0',
  left: '50%',
  zIndex: '2',
  transform: 'translateX(-50%)',
  width: '100%',
  height: '52px',
  backgroundColor: '#D9D9D9'
})
