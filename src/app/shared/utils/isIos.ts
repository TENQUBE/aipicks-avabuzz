export default function isIos() {
  const appTypeHeader = navigator.userAgent
  return (
    appTypeHeader.indexOf('iPhone') > 0 ||
    appTypeHeader.indexOf('iPod') > 0 ||
    appTypeHeader.indexOf('iPad') > 0
  )
}
