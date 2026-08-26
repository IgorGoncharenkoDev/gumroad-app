export async function createUniqueSlug(
  baseSlug: string,
  slugExistsChecker: (slug: string) => Promise<boolean>,
) {
  let candidateSlug = baseSlug
  let suffix = 2

  while (await slugExistsChecker(candidateSlug)) {
    candidateSlug = `${baseSlug}-${suffix++}`
  }

  return candidateSlug
}