import type { Metadata } from 'next'
import ResourcesClient from './ResourcesClient'
import { client } from '@/sanity/lib/client'
import { allResourcesQuery } from '@/sanity/lib/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Resources & Downloads',
  description: 'Industry guides, compliance overviews, market reports, and product data from Cowbell Keystone Trading Ireland Limited.',
}

export default async function ResourcesPage() {
  let sanityResources = []
  try {
    sanityResources = await client.fetch(allResourcesQuery)
  } catch (e) {
    // silently fail and fallback to client-side static
  }

  return <ResourcesClient sanityResources={sanityResources} />
}
