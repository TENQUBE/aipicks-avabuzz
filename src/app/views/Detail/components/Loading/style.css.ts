import { globalStyle, keyframes, style } from '@vanilla-extract/css'

export const area = style({
  position: 'absolute',
  top: '38px',
  left: '0',
  zIndex: '1',
  width: '100%',
  height: 'calc(100% - 90px)',
  backgroundColor: '#fff'
})

export const content = style({
  position: 'absolute',
  top: '0',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%'
})

export const loadingContent = style({
  position: 'relative',
  flex: '1 0 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  padding: '2.8rem 2rem'
})

export const title = style({
  display: 'flex',
  width: '100%',
  fontSize: '2rem',
  fontWeight: '600',
  lineHeight: '2.8rem',
  letterSpacing: '-0.02rem'
})

export const centerArea = style({
  position: 'relative',
  width: '100%',
  height: '100%'
})

export const progressArea = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '170px',
  height: '170px'
})

export const progressDecoArea = style({
  position: 'absolute',
  top: '0',
  left: '0',
  overflow: 'visible'
})

export const progressBorder = style({
  fill: 'none',
  stroke: '#EEF2F5',
  strokeWidth: '10'
})

export const progress = style({
  fill: 'none',
  stroke: 'url(#paint0_linear_248_1103)',
  strokeWidth: '10',
  strokeDasharray: '533.8',
  strokeDashoffset: '533.8',
  strokeLinecap: 'round',
  transformOrigin: 'center',
  transform: 'rotate(-90deg)'
})

export const pluseArea = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '194px',
  height: '194px'
})

const pulseCircle = keyframes({
  '0%': {
    opacity: '0',
    transform: 'scale(0)'
  },
  '50%': {
    opacity: '0.1'
  },
  '100%': {
    opacity: '0',
    transform: 'scale(1.8)'
  }
})

export const pulse = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '118px',
  height: '118px',
  borderRadius: '50%'
})

export const baackground = style({
  content: '',
  width: '100%',
  height: '100%',
  background: '#3AB1F0',
  borderRadius: '50%',
  opacity: '0.3',
  position: 'absolute',
  top: '0',
  right: '0',
  zIndex: '-1',
  transform: 'scale(0)',
  animation: `${pulseCircle} 6s ease-out infinite`,

  selectors: {
    '&:nth-of-type(1)': {
      animationDelay: '-4s'
    },
    '&:nth-of-type(2)': {
      animationDelay: '-2s'
    },
    '&:nth-of-type(3)': {
      animationDelay: '0s'
    }
  }
})

export const imgArea = style({
  position: 'relative',
  width: '100px',
  height: '100px'
})
globalStyle(`${imgArea} > img`, {
  width: '100%',
  height: '100%',
  objectFit: 'contain'
})

export const adArea = style({
  width: '100%'
})

export const adContent = style({
  width: 'calc(100% - 40px)',
  margin: '0 2rem 1.2rem'
})

export const googleAdArea = style({
  width: '100%',
  height: '150px'
})

export const button = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'calc(100% - 40px)',
  padding: '1.7rem 0',
  margin: '0 2rem 1.2rem',
  borderRadius: '50px',
  backgroundColor: '#0768DD',
  opacity: '0',
  transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
  transform: 'translateY(30px)',
  color: '#FFF',
  fontSize: '1.6rem',
  fontWeight: '600',
  lineHeight: '2.3rem',
  letterSpacing: '-0.02rem',

  selectors: {
    '&.show': {
      opacity: '1',
      transform: 'translateY(0)'
    }
  }
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
