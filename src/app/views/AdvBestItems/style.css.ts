import { style } from '@vanilla-extract/css'

export const area = style({
  padding: '3.2rem 2rem 10.1rem'
})

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.8rem'
})

export const title = style({
  fontSize: '1.8rem',
  fontWeight: '600',
  lineHeight: '2.4rem',
  letterSpacing: '-0.02rem'
})

export const date = style({
  color: '#81878D',
  fontSize: '1.4rem',
  fontWeight: '400',
  lineHeight: '2rem',
  letterSpacing: '-0.02rem'
})

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '5.4rem'
})

export const item = style({
  width: '100%',
  padding: '2rem',
  marginBottom: '1.6rem',
  borderRadius: '16px',
  backgroundColor: '#FFF',

  selectors: {
    '&:last-of-type': {
      marginBottom: '0'
    }
  }
})

export const nameArea = style({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1.2rem'
})

export const stockName = style({
  marginRight: '0.8rem',
  fontSize: '1.6rem',
  fontWeight: '600',
  lineHeight: '2.3rem',
  letterSpacing: '-0.02rem'
})

export const pmsName = style({
  padding: '0.4rem 0.8rem',
  borderRadius: '12px',
  fontSize: '1.3rem',
  fontWeight: '600',
  lineHeight: '1.8rem',
  letterSpacing: '-0.02rem'
})

export const dealItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.2rem',

  selectors: {
    '&:last-of-type': {
      marginBottom: '0'
    }
  }
})

export const dealItemKey = style({
  color: '#5E6265',
  fontSize: '1.4rem',
  lineHeight: '2rem',
  letterSpacing: '-0.02rem'
})

export const dealItemValue = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#2E3031',
  fontSize: '1.4rem',
  fontWeight: '500',
  lineHeight: '2rem',
  letterSpacing: '-0.02rem'
})

export const totalRate = style({
  marginLeft: '0.4rem',
  fontSize: '1.4rem',
  fontWeight: '500',
  lineHeight: '2rem',
  letterSpacing: '-0.02rem',

  selectors: {
    '&.up': {
      color: '#D92A21'
    },
    '&.down': {
      color: '#0A80F1'
    }
  }
})

export const adArea = style({
  height: '150px'
})

export const button = style({
  position: 'fixed',
  bottom: '64px',
  left: '20px',
  zIndex: '4',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'calc(100% - 40px)',
  padding: '1.7rem 0',
  borderRadius: '50px',
  backgroundColor: '#0768DD',
  color: '#fff',
  fontSize: '1.6rem',
  fontWeight: '600',
  lineHeight: '2.3rem',
  letterSpacing: '-0.02rem'
})
