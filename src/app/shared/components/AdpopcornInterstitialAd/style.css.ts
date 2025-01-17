import { globalStyle, style, keyframes } from '@vanilla-extract/css'

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
  left: '0',
  zIndex: '999',
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.45)',
  backdropFilter: 'blur(10px)',
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

export const content = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  zIndex: '999',
  width: '300px',
  height: '250px',
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

export const button = style({
  position: 'absolute',
  top: '-30px',
  right: '0',
  zIndex: '999',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#FFF',
  fontSize: '1.6rem',
  fontWeight: '600',
  lineHeight: '2.2rem',
  letterSpacing: '-0.02rem'
})

globalStyle(`${button} > svg`, {
  marginRight: '0.4rem'
})
