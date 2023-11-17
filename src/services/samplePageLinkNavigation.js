export const samePageLinkNavigation = (event) => {
  if (
    event.defaultPrevented ||
        event.button !== 0 || // ignore everything but left-click
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
  ) {
    return false
  }
  return true
}
