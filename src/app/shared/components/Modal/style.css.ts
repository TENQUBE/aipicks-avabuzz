import { keyframes, style } from '@vanilla-extract/css'

import { MODAL_ANIMATION_DURATION } from '@/app/shared/config'

const fadeIn = keyframes({
  '0%': {
    opacity: '0'
  },
  '100%': {
    opacity: '1'
  }
})

export const fadeOut = keyframes({
  '0%': {
    opacity: '1'
  },
  '100%': {
    opacity: '0'
  }
})

export const dim = style({
  position: 'fixed',
  top: '0',
  zIndex: '100',
  width: '100%',
  height: '100%',
  backgroundColor: '#00000075',
  opacity: '0',
  animation: `${fadeIn} ${(MODAL_ANIMATION_DURATION - 100) / 1000}s forwards`,

  selectors: {
    '&.close': {
      animationName: `${fadeOut}`
    }
  }
})

export const toTop = keyframes({
  '0%': {
    transform: 'translate(-50%, -45%)'
  },
  '100%': {
    transform: 'translate(-50%, -50%)'
  }
})

export const toBottom = keyframes({
  '0%': {
    transform: 'translate(-50%, -50%)'
  },
  '100%': {
    transform: 'translate(-50%, -45%)'
  }
})

export const contentArea = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  zIndex: '101',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'calc(100% - 4rem)',
  borderRadius: '20px',
  overflow: 'hidden',
  backgroundColor: '#fff',
  opacity: '0',
  transform: 'translate(-50%, -45%)',
  animation: `${toTop} ${MODAL_ANIMATION_DURATION / 1000}s forwards, ${fadeIn} ${
    MODAL_ANIMATION_DURATION / 1000
  }s forwards`,

  selectors: {
    '&.close': {
      animationName: `${toBottom}, ${fadeOut}`
    }
  }
})

export const bottomAdBannerArea = style({
  position: 'absolute',
  bottom: '0',
  left: '50%',
  zIndex: '101',
  transform: 'translateX(-50%)',
  width: '100%',
  height: '52px',
  backgroundColor: '#D9D9D9'
})
