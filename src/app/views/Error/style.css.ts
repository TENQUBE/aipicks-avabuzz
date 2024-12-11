import { style } from '@vanilla-extract/css'

export const area = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '2.4rem 2rem',
  boxShadow: '0px 3px 15px 0px rgba(0, 0, 0, 0.08)'
})

export const title = style({
  marginBottom: '0.8rem',
  fontSize: '1.8rem',
  fontWeight: '600',
  lineHeight: '2.4rem',
  letterSpacing: '-0.02rem'
})

export const desc = style({
  marginBottom: '2rem',
  color: '#5E6265',
  textAlign: 'center',
  fontSize: '1.6rem',
  fontWeight: '400',
  lineHeight: '2.3rem',
  letterSpacing: '-0.02rem'
})

export const button = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '1.4rem 0',
  borderRadius: '12px',
  backgroundColor: '#253FEB',
  color: '#FFF',
  fontSize: '1.6rem',
  fontWeight: '600',
  lineHeight: '2.3rem',
  letterSpacing: '-0.02rem;'
})
