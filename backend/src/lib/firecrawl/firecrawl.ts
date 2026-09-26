import { Firecrawl } from 'firecrawl'
import { z } from 'zod'

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
  return await firecrawl.search(query, {
    limit,
    scrapeOptions: {
      formats: ['markdown'],
    },
  })
}

const scrapeJsonSchema = z.object({
  description: z.string(),
})

export async function firecrawlScrape(url: string) {
  const result = await firecrawl.scrape(url, {
    formats: [
      'images',
      {
        type: 'json',
        prompt:
          'Extract a short product description (2-3 sentences). If the page is not a product page, summarize what the page offers in 2-3 sentences.',
        schema: z.toJSONSchema(scrapeJsonSchema),
      },
    ],
    proxy: 'auto',
    timeout: 120_000,
    onlyMainContent: false,
  })

  const json = scrapeJsonSchema.parse(result.json)

  return {
    ...result,
    json,
  }
}