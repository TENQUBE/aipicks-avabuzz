import { style } from '@vanilla-extract/css'

export const arae = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  background: 'linear-gradient(180deg, #276EF7 0%, #6015DA 81%)'
})

export const topBar = style({
  position: 'fixed',
  top: '0',
  left: '0',
  zIndex: '1',
  width: '100%',
  height: '56px'
})

export const closeButton = style({
  position: 'absolute',
  top: '15px',
  right: '16px'
})
