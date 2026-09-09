import { Firecrawl } from 'firecrawl'

import { env } from '@/config/env'

export const firecrawl = new Firecrawl({
  apiKey: env.FIRECRAWL_API_KEY,
})

type FirecrawlSearchParams = {
  query: string
  limit: number
}

/*  TODO i |>
 *    For future:
 *      SDK users: search results are grouped by source type, not under a generic .data array.
 *      Access web results with result.web, news with result.news, and images with result.images.
 *      |
 *      Docs: https://docs.firecrawl.dev/features/search
 * */

export async function firecrawlSearch({ limit, query }: FirecrawlSearchParams) {
  const results = await firecrawl.search(query, {
    limit,
    scrapeOptions: {
      formats: ['markdown'],
    },
  })

  return results
}
