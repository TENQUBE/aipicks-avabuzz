import { style, keyframes } from '@vanilla-extract/css'

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

export const toastOpen = keyframes({
  '0%': {
    transform: 'translate(-50%, 0)',
    opacity: '0'
  },

  '100%': {
    transform: 'translate(-50%, -50px)',
    opacity: '1'
  }
})

export const toastClose = keyframes({
  '0%': {
    transform: 'translate(-50%, -50px)',
    opacity: '1'
  },

  '100%': {
    transform: 'translate(-50%, 0)',
    opacity: '0'
  }
})

export const toastArea = style({
  position: 'fixed',
  bottom: '52px',
  left: '50%',
  zIndex: '2',
  transform: 'translate(-50%, 0)',
  padding: '1.2rem 2rem',
  borderRadius: '100px',
  opacity: '0',
  boxShadow: '8px 8px 20px 0px rgba(0, 0, 0, 0.12)',
  backgroundColor: '#808080',
  color: '#fff',
  fontSize: '1.6rem',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',

  selectors: {
    '&.open': {
      animation: `${toastOpen} 0.3s forwards`
    },
    '&.close': {
      animation: `${toastClose} 0.3s forwards`
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
