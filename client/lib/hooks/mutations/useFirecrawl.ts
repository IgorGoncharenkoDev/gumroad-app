import { useMutation } from '@tanstack/react-query'

import { apiClient } from '@/lib/api-client/api-client'
import { unwrapApiResultOrThrow } from '@/lib/api-client/helpers'
import { Candidate } from '@/lib/types/product'

type FirecrawlIngestMutationParams = {
  productId: string
  selectedCandidates: Candidate[]
}

export function useFirecrawlIngest() {
  return useMutation({
    mutationFn: ({
      productId,
      selectedCandidates,
    }: FirecrawlIngestMutationParams) =>
      unwrapApiResultOrThrow(
        apiClient.firecrawl.ingest({
          productId,
          selectedCandidates,
        }),
      ),
  })
}

type FirecrawlScrapeMutationParams = {
  productId: string
  url: string
}

export function useFirecrawlScrape() {
  return useMutation({
    mutationFn: ({ productId, url }: FirecrawlScrapeMutationParams) =>
      unwrapApiResultOrThrow(
        apiClient.firecrawl.scrape({
          productId,
          url,
        }),
      ),
  })
}

type FirecrawlSearchMutationParams = {
  productId: string
  searchParams: {
    limit: number
    query: string
  }
}

export function useFirecrawlSearch() {
  return useMutation({
    mutationFn: ({ productId, searchParams }: FirecrawlSearchMutationParams) =>
      unwrapApiResultOrThrow(
        apiClient.firecrawl.search({
          productId,
          searchParams,
        }),
      ),
  })
}