import { keyframes, style } from '@vanilla-extract/css'

const skeletonGradientAnimation = keyframes({
  '0%': {
    backgroundColor: 'rgba(165, 165, 165, 0.1)'
  },

  '50%': {
    backgroundColor: 'rgba(165, 165, 165, 0.3)'
  },

  '100%': {
    backgroundColor: 'rgba(165, 165, 165, 0.1)'
  }
})

export const skeleton = style({
  borderRadius: '16px',
  animation: `${skeletonGradientAnimation} 1.8s infinite ease-in-out`
})
