import { getClient } from '@/lib/drupal-client'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { GET_SPECIES_BY_PATH } from '@/lib/queries'
import { DrupalSpecies } from '@/lib/types'
import Header from '../../components/Header'
import ResponsiveImage from '../../components/ResponsiveImage'
import { ArrowLeft } from 'lucide-react'

export const revalidate = 300
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string[] }>
}

interface SpeciesByPathData {
  route: {
    entity: DrupalSpecies
  } | null
}

async function getSpecies(path: string): Promise<DrupalSpecies | null> {
  try {
    const client = getClient()
    const data = await client.raw(GET_SPECIES_BY_PATH, { path })
    return data?.route?.entity || null
  } catch (error) {
    console.error('Error fetching species:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const path = `/species/${slug.join('/')}`
  const item = await getSpecies(path)

  if (!item) {
    return { title: 'Species Not Found | Conservation' }
  }

  return {
    title: `${item.title} | Conservation`,
    description: ((item as any).body?.processed ? (item as any).body.processed.replace(/<[^>]*>/g, '').substring(0, 160) : '') || `Learn more about ${item.title}.`,
  }
}

export default async function SpeciesDetailPage({ params }: PageProps) {
  const { slug } = await params
  const path = `/species/${slug.join('/')}`
  const item = await getSpecies(path)

  if (!item) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/species"
            className="inline-flex items-center text-emerald-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Species
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {item.title}
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {(item as any).photo?.url && (
                <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg mb-8">
                  <ResponsiveImage
                    src={(item as any).photo.url}
                    alt={(item as any).photo.alt || item.title}
                    fill
                    className="object-cover"
                    variations={(item as any).photo.variations}
                    targetWidth={800}
                  />
                </div>
              )}

              {(item as any).body?.processed && (
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: (item as any).body.processed }}
                  />
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Details</h3>
                <dl className="space-y-4">
                  {(item as any).habitat && (
                    <div>
                      <dt className="text-sm text-gray-500">Habitat</dt>
                      <dd className="font-semibold text-gray-900">{(item as any).habitat}</dd>
                    </div>
                  )}
                  {(item as any).populationEstimate && (
                    <div>
                      <dt className="text-sm text-gray-500">Population Estimate</dt>
                      <dd className="font-semibold text-gray-900">{(item as any).populationEstimate}</dd>
                    </div>
                  )}
                  {(item as any).scientificName && (
                    <div>
                      <dt className="text-sm text-gray-500">Scientific Name</dt>
                      <dd className="font-semibold text-gray-900">{(item as any).scientificName}</dd>
                    </div>
                  )}
                </dl>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="block w-full text-center px-6 py-3 bg-emerald-700 text-white rounded-lg font-bold hover:bg-emerald-600 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
