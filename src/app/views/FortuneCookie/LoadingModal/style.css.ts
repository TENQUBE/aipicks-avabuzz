import { keyframes, style } from '@vanilla-extract/css'

export const dimed = style({
  position: 'fixed',
  top: '0',
  left: '0',
  zIndex: '1',
  display: 'flex',
  justifyItems: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.65) 100%)'
})

export const content = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '320px',
  padding: '4rem 1.6rem',
  backgroundColor: '#fff',
  borderRadius: '16px'
})

const imgMoveKeyframes = keyframes({
  '0%': {
    transform: 'scale(0.9)'
  },
  '5%': {
    transform: 'scale(0.9) rotate(-10deg)'
  },
  '10%': {
    transform: 'scale(0.9) rotate(10deg)'
  },
  '15%': {
    transform: 'scale(0.9) rotate(-10deg)'
  },
  '20%': {
    transform: 'scale(0.9) rotate(10deg)'
  },
  '25%': {
    transform: 'scale(0.9) rotate(-10deg)'
  },
  '30%': {
    transform: 'scale(0.9) rotate(10deg)'
  },
  '35%': {
    transform: 'scale(0.9) rotate(-10deg)'
  },
  '40%': {
    transform: 'scale(0.9)'
  },
  '60%': {
    transform: 'scale(1)'
  },
  '90%': {
    transform: 'scale(1)'
  },
  '100%': {
    transform: 'scale(0.9)'
  }
})

export const img = style({
  width: '184px',
  height: '108px',
  objectFit: 'contain',
  marginBottom: '2.4rem',
  animation: `${imgMoveKeyframes} 1.5s infinite ease-in-out forwards`,
  transform: 'translateY(0) scale(0.9)'
})

export const desc = style({
  marginBottom: '2.4rem',
  fontSize: '2rem',
  fontWeight: '600',
  lineHeight: '3rem',
  textAlign: 'center',
  letterSpacing: '-0.02rem'
})

export const loadingDotArea = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

const loadingKeyframes = keyframes({
  '0%': {
    transform: 'translateY(0px)'
  },
  '50%': {
    transform: 'translateY(-6px)'
  },
  '100%': {
    transform: 'translateY(0px)'
  }
})

export const loadingDot = style({
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  marginRight: '0.3rem',
  animation: `${loadingKeyframes} 1s infinite ease-in-out forwards`,

  selectors: {
    '&:nth-of-type(1)': {
      backgroundColor: 'rgba(71,60,231,0.4)'
    },
    '&:nth-of-type(2)': {
      backgroundColor: 'rgba(71,60,231,0.6)',
      animationDelay: '0.2s'
    },
    '&:nth-of-type(3)': {
      backgroundColor: 'rgba(71,60,231,0.8)',
      animationDelay: '0.4s'
    },
    '&:nth-of-type(4)': {
      backgroundColor: 'rgba(71,60,231,1)',
      animationDelay: '0.6s'
    },
    '&:last-of-type': {
      marginRight: '0'
    }
  }
})
