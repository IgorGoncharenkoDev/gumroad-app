export function getUniqueImages (images: unknown[], cap: number): string[] {
  return [
    ...new Set(
      images
        .filter((i): i is string => typeof i === 'string')
        .map((i) => i.trim())
        .filter(i => i.length > 0),
    )
  ].slice(0, cap)
}