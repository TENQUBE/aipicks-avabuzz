import { style } from '@vanilla-extract/css'

export const area = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  overflow: 'hidden'
})

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2.8rem 2rem 0rem'
})

export const title = style({
  width: '100%',
  marginBottom: '1.2rem',
  fontSize: '2rem',
  fontWeight: '600',
  lineHeight: '2.8rem'
})

export const desc = style({
  width: '100%',
  fontSize: '1.4rem',
  lineHeight: '2rem',
  letterSpacing: '-0.02rem',
  color: '#5E6265'
})

export const listArea = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

export const button = style({
  display: 'flex',
  justifyContent: 'center',
  width: 'calc(100% - 4rem)',
  margin: '0 2rem 2rem',
  padding: '1.7rem 0',
  borderRadius: '50px',
  backgroundColor: '#E1E6E9',
  color: '#2E3031',
  fontSize: '1.6rem',
  fontWeight: '600',
  lineHeight: '2.3rem',
  letterSpacing: '-0.02rem'
})
