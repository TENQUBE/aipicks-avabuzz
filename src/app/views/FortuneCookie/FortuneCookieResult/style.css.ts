import { keyframes, style } from '@vanilla-extract/css'

export const area = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  padding: '1.4rem 1.3rem '
})

export const imgArea = style({
  position: 'relative',
  marginBottom: '3.2rem'
})

const blink = keyframes({
  '0%': {
    opacity: '1'
  },
  '30%': {
    opacity: '0'
  },
  '100%': {
    opacity: '1'
  }
})

export const startImg = style({
  position: 'absolute',
  width: '33px',
  height: '34px',
  animation: `${blink} 3s infinite`,

  selectors: {
    '&.first': {
      top: '26px',
      left: '-26px',
      animationDelay: '0.15s'
    },
    '&.second': {
      bottom: '5px',
      right: '-35px',
      animationDelay: '0.3s'
    }
  }
})

export const circleImg = style({
  position: 'absolute',
  top: '65px',
  left: '-33px',
  width: '15px',
  height: '15px',
  animation: `${blink} 3s infinite`,
  animationDelay: '0.6s'
})

export const pieImg = style({
  position: 'absolute',
  width: '17px',
  height: '17px',
  animation: `${blink} 3s infinite`,

  selectors: {
    '&.first': {
      top: '61px',
      left: '15px',
      animationDelay: '0.75s'
    },
    '&.second': {
      bottom: '4px',
      left: '18px',
      animationDelay: '0.9s'
    },
    '&.third': {
      top: '36px',
      right: '-9px',
      animationDelay: '10.5s'
    }
  }
})

export const triangleImg = style({
  position: 'absolute',
  width: '19px',
  height: '19px',
  animation: `${blink} 3s infinite`,

  selectors: {
    '&.first': {
      bottom: '13px',
      left: '-26px',
      animationDelay: '0.45s'
    },
    '&.second': {
      bottom: '-6px',
      right: '40px',
      animationDelay: '0.75s'
    },
    '&.third': {
      top: '55px',
      right: '-27px',
      animationDelay: '0.9s'
    }
  }
})

export const fortuneCookieImg = style({
  width: '240px',
  height: '140px',
  objectFit: 'contain'
})

export const fortuneCookieResultArea = style({
  width: '100%',
  padding: '1.2rem 2rem',
  backgroundColor: 'rgba(255, 255, 255, 0.20)',
  borderRadius: '20px',
  color: '#FFF',
  textAlign: 'center',
  fontSize: '1.6rem',
  fontWeight: '500',
  lineHeight: '2.25rem',
  letterSpacing: '-0.02rem',
  wordBreak: 'keep-all'
})

export const button = style({
  position: 'absolute',
  bottom: '20px',
  left: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'calc(100% - 32px)',
  padding: '1.6rem',
  backgroundColor: '#121212',
  borderRadius: '16px',
  color: '#FFF',
  fontSize: '1.6rem',
  fontWeight: '600',
  lineHeight: '2.4rem',
  letterSpacing: '-0.0032rem'
})

export const adArea = style({
  width: '320px',
  height: '100px'
})
