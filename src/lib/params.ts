/**
 * Strips undefined, null, and empty-string values from a params object
 * so callers don't have to spread conditional objects.
 */
export function buildQueryParams(
  params: Record<string, string | number | boolean | undefined | null>
): Record<string, string | number | boolean> {
  return Object.fromEntries(
    Object.entries(params).filter(
      (entry): entry is [string, string | number | boolean] =>
        entry[1] !== undefined && entry[1] !== null && entry[1] !== ""
    )
  )
}
