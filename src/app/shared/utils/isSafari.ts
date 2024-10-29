export default function isSafari(userAgent: string) {
  const lowerCaseUserAgent = userAgent.toLowerCase()

  switch (true) {
    case /chrome/.test(lowerCaseUserAgent):
      return false

    case /safari/.test(lowerCaseUserAgent):
      return true
    default:
      return false
  }
}
