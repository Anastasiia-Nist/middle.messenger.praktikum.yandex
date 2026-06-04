export const isCustomEventWithStringDetail = <K extends string>(
  event: Event,
  key: K
): event is CustomEvent<Record<K, string>> => {
  if (!(event instanceof CustomEvent)) {
    return false
  }

  const { detail } = event

  return (
    typeof detail === 'object' &&
    detail !== null &&
    key in detail &&
    typeof (detail as Record<string, unknown>)[key] === 'string'
  )
}
