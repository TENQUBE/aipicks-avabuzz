import { globalStyle } from '@vanilla-extract/css'

globalStyle('*', {
  margin: '0',
  padding: '0',
  boxSizing: 'border-box',
  userSelect: 'none',
  WebkitTapHighlightColor: 'rgba(255,255,255,0)',
  WebkitTouchCallout: 'none'
})

globalStyle(
  `
  html,
  body,
  main div,
  main span,
  main applet,
  main object,
  main iframe,
  main h1,
  main h2,
  main h3,
  main h4,
  main h5,
  main h6,
  main p,
  main blockquote,
  main pre,
  main a,
  main abbr,
  main acronym,
  main address,
  main big,
  main cite,
  main code,
  main del,
  main dfn,
  main em,
  main img,
  main ins,
  main kbd,
  main q,
  main s,
  main samp,
  main small,
  main strike,
  main strong,
  main sub,
  main sup,
  main tt,
  main var,
  main b,
  main u,
  main i,
  main center,
  main dl,
  main dt,
  main dd,
  main ol,
  main ul,
  main li,
  main fieldset,
  main form,
  main label,
  main legend,
  main table,
  main caption,
  main tbody,
  main tfoot,
  main thead,
  main tr,
  main th,
  main td,
  main article,
  main aside,
  main canvas,
  main details,
  main embed,
  main figure,
  main figcaption,
  main footer,
  main header,
  main hgroup,
  main menu,
  main nav,
  main output,
  main ruby,
  main section,
  main summary,
  main time,
  main mark,
  main audio,
  main video
  `,
  {
    margin: '0',
    padding: '0',
    border: '0',
    verticalAlign: 'baseline',
    fontSize: '10px',
    color: '#121212'
  }
)

globalStyle(
  `
  main article,
  main aside,
  main details,
  main figcaption,
  main figure,
  main footer,
  main header,
  main hgroup,
  main menu,
  main nav,
  main section
  `,
  {
    display: 'block'
  }
)

globalStyle('body, main', {
  width: '100%',
  height: '100%',
  margin: '0',
  padding: '0',
  overflow: 'hidden',
  position: 'fixed',
  fontFamily: 'var(--font-pretendard)',
  fontWeight: '400',
  userSelect: 'none',
  WebkitFontSmoothing: 'antialiased',
  WebkitTextSizeAdjust: '100%'
})

globalStyle('main ol, main ul', { listStyle: 'none' })

globalStyle('main a', { textDecoration: 'none', color: 'inherit' })

globalStyle(`main input, main textarea`, {
  WebkitAppearance: 'none',
  WebkitBorderRadius: '0'
})

globalStyle('main input, main textarea, main button', {
  outline: 'none',
  border: 'none',
  backgroundColor: 'transparent',
  color: 'inherit',
  fontFamily: 'var(--font-pretendard)',
  fontSize: '10px'
})

globalStyle('main button', {
  padding: '0',
  cursor: 'pointer'
})
