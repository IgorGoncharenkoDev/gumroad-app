'use client'

import { Document, SearchResultWeb } from 'firecrawl'
import { useMemo, useState } from 'react'
import { toast } from 'sonner';

import { ImportModeTabs } from '@/components/creator/products/import-mode-tabs'
import { PanelCard } from '@/components/creator/products/panel-card'
import { ResultRow } from '@/components/creator/products/result-row'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { TabsContent } from '@/components/ui/tabs'
import {
  useFirecrawlIngest,
  useFirecrawlScrape,
  useFirecrawlSearch,
} from '@/lib/hooks/mutations/useFirecrawl'
import { useUpdateProduct } from '@/lib/hooks/mutations/useProduct'
import { Candidate } from '@/lib/types/product'

const MODES = ['search', 'scrape'] as const
type Mode = (typeof MODES)[number]

const isMode = (v: string): v is Mode => MODES.includes(v as Mode)

const isSearchResultWebType = (
  result: SearchResultWeb | Document,
): result is SearchResultWeb => {
  return 'url' in result
}

type ImportPanelProps = {
  productId: string
  onAfterIngest: () => Promise<void>
}

export function ImportPanel({ productId, onAfterIngest }: ImportPanelProps) {
  const {
    isPending: isMutateFirecrawlIngestPending,
    mutate: mutateFirecrawlIngest,
  } = useFirecrawlIngest()
  const {
    isPending: isMutateFirecrawlScrapePending,
    mutate: mutateFirecrawlScrape,
  } = useFirecrawlScrape()
  const {
    isPending: isMutateFirecrawlSearchPending,
    mutate: mutateFirecrawlSearch,
  } = useFirecrawlSearch()
  const {
    isPending: isUpdateProductMutationPending,
    mutate: mutateUpdateProduct,
  } = useUpdateProduct()

  const [mode, setMode] = useState<Mode>(MODES[0])

  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<
    (SearchResultWeb | Document)[]
  >([])

  const [urlInput, setUrlInput] = useState('')
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [selectedMap, setSelectedMap] = useState<Record<string, boolean>>({})
  const [extractedDescription, setExtractedDescription] = useState('')

  const selectedCandidates = useMemo(
    () => candidates.filter((c) => selectedMap[c.url]),
    [candidates, selectedMap],
  )

  const handleSearch = () => {
    mutateFirecrawlSearch(
      {
        productId,
        searchParams: {
          limit: 5,
          query,
        },
      },
      {
        onError: () => {
          // TODO i |> handle potential errors
        },
        onSuccess: (searchData) => {
          setSearchResults(searchData.web ?? [])
        },
      },
    )
  }

  const handleQuickImport = (url: string) => {
    setSearchResults([])
    setCandidates([])
    setSelectedMap({})
    setExtractedDescription('')

    mutateFirecrawlScrape(
      {
        productId,
        url: url.trim(),
      },
      {
        onError: () => {
          // TODO i |> handle potential errors
        },
        onSuccess: (searchData) => {
          setCandidates(searchData.candidates ?? [])
          setExtractedDescription(searchData.description ?? '')
        },
      },
    )
  }

  const handleUpdateProductDescription = () => {
    const descriptionText = extractedDescription.trim()

    if (!descriptionText.length) {
      return
    }

    mutateUpdateProduct(
      {
        productData: {
          description: descriptionText,
        },
        productId,
      },
      {
        onError: () => {
          // TODO i |> handle potential errors
        },
        onSuccess: async () => {
          await onAfterIngest()
        },
      },
    )
  }

  const handleIngestSelected = async () => {
    mutateFirecrawlIngest(
      {
        productId,
        selectedCandidates,
      },
      {
        onError: () => {
          toast.error('Failed to ingest asset(s)')
          // TODO i |> handle potential errors
        },
        onSuccess: async (result) => {
          if (result.assetsFailedToIngest.length) {
            toast.error(
              `${result.assetsFailedToIngest.length} asset(s) failed to ingest`,
            )
          }
          if (result.assetsIngested.length) {
            toast.success(
              `${result.assetsIngested.length} asset(s) ingested successfully`,
            )
          }

          await onAfterIngest()
        },
      },
    )
  }

  const handleSelectCandidate = (url: string) => {
    setSelectedMap((items) => ({
      ...items,
      [url]: !items[url],
    }))
  }

  return (
    <div className="space-y-6">
      <PanelCard title="Import Suite (Firecrawl)" />
      <ImportModeTabs
        value={mode}
        onValueChange={(v) => {
          if (isMode(v)) setMode(v)
        }}
      >
        <TabsContent className="space-y-4" value="search">
          <PanelCard title="Search Pages">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                className="h-10 sm:flex-1 rounded-none bg-card shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Example: search 4k dog images..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Button
                className="inline-flex h-10 sm:w-40 hover:bg-[#ff90e8] hover:text-black items-center justify-center gap-2 rounded-none border border-border bg-[#ff90e8] cursor-pointer px-4 text-sm font-medium text-black"
                disabled={isMutateFirecrawlSearchPending || !query.trim()}
                onClick={handleSearch}
              >
                {isMutateFirecrawlSearchPending ? 'Searching...' : 'Search'}
              </Button>
            </div>

            <div className="mt-4 grid gap-3">
              {searchResults.length
                ?
                  searchResults
                    .filter(isSearchResultWebType)
                    .map((searchResult) => (
                      <ResultRow
                        actions={
                          <Button
                            className="inline-flex h-10  hover:bg-[#ff90e8] hover:text-black items-center justify-center gap-2 rounded-none border border-border bg-[#ff90e8] cursor-pointer px-4 text-sm font-medium text-black"
                            disabled={isMutateFirecrawlScrapePending}
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setMode('scrape')
                              setUrlInput(searchResult.url)
                              handleQuickImport(searchResult.url)
                            }}
                          >
                            Quick Import
                          </Button>
                        }
                        description={searchResult.description}
                        key={searchResult.url}
                        title={searchResult.title}
                        url={searchResult.url}
                      />
                    ))
                : null}
            </div>
          </PanelCard>
        </TabsContent>

        <TabsContent className="space-y-4" value="scrape">
          <PanelCard title="Quick import: Scrape one page">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                className="h-10 sm:flex-1 rounded-none bg-card shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="example.com"
                value={urlInput}
                onChange={(event) => setUrlInput(event.target.value)}
              />
              <Button
                className="inline-flex h-10 sm:w-40 hover:bg-[#ff90e8] hover:text-black items-center justify-center gap-2 rounded-none border border-border bg-[#ff90e8] cursor-pointer px-4 text-sm font-medium text-black"
                disabled={isMutateFirecrawlScrapePending || !urlInput.trim().length}
                onClick={() => handleQuickImport(urlInput)}
              >
                {isMutateFirecrawlScrapePending ? 'Importing...' : 'Import'}
              </Button>
            </div>
          </PanelCard>
          <PanelCard
            rightSection={
              <Button
                className="inline-flex mt-2 h-10 sm:w-40 hover:bg-[#ff90e8] hover:text-black items-center justify-center gap-2 rounded-none border border-border bg-[#ff90e8] cursor-pointer px-4 text-sm font-medium text-black"
                disabled={
                  isUpdateProductMutationPending ||
                  !extractedDescription.trim().length
                }
                onClick={() => handleUpdateProductDescription()}
              >
                Apply
              </Button>
            }
            title="Generated Description"
          >
            <div className="border border-border bg-background p-5">
              {extractedDescription.trim() ? (
                <p className="whitespace-pre-wrap text-sm text-foreground/90">
                  {extractedDescription.trim()}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Run quick import to generate a description
                </p>
              )}
            </div>
          </PanelCard>
        </TabsContent>
      </ImportModeTabs>

      {candidates.length ? (
        <Card className="rounded-none border border-border bg-card p-5 md:p-6 space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-base font-medium">Candidates</div>
              <div>
                {candidates.length} found and {selectedCandidates.length}{' '}
                selected
              </div>
            </div>
            <Button
              className="inline-flex mt-2 h-10 sm:w-40 hover:bg-[#ff90e8] hover:text-black items-center justify-center gap-2 rounded-none border border-border bg-[#ff90e8] cursor-pointer px-4 text-sm font-medium text-black"
              disabled={
                isMutateFirecrawlIngestPending || !selectedCandidates.length
              }
              onClick={() => handleIngestSelected()}
            >
              {isMutateFirecrawlIngestPending ? 'Ingesting...' : 'Ingest'}
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
            {candidates.map((c) => {
              const checked = selectedMap[c.url] ?? false

              return (
                <label
                  className={
                    'cursor-pointer border border-border bg-background transition hover:bg-muted/20' +
                    (checked ? 'ring-1 ring-primary/70' : '')
                  }
                  key={c.url}
                >
                  <div className="flex items-center justify-between border-b border-border bg-card px-2 py-2 text-[11px]">
                    <span className="flex items-center gap-2">
                      <input
                        checked={checked}
                        type="checkbox"
                        onChange={() => handleSelectCandidate(c.url)}
                      />
                      {checked ? 'Selected' : 'Select'}
                    </span>
                  </div>
                  <div className="aspect-4/3 w-full bg-muted">
                    <img
                      alt="candidate"
                      className="h-full w-full object-cover"
                      loading="lazy"
                      src={c.url}
                    />
                  </div>
                </label>
              )
            })}
          </div>
        </Card>
      ) : null}
    </div>
  )
}
