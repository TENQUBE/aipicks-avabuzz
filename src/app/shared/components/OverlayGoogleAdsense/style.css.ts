import { globalStyle, style } from '@vanilla-extract/css'

export const dim = style({
  position: 'fixed',
  top: '0',
  left: '0',
  zIndex: '999',
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.45)',
  backdropFilter: 'blur(10px)'
})

export const content = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  zIndex: '999',
  transform: 'translate(-50%, -50%)',
  width: '300px',
  height: '450px'
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
