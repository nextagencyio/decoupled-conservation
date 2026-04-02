import { getClient } from '@/lib/drupal-client'
import { Metadata } from 'next'
import { GET_PROJECTS } from '@/lib/queries'
import { ProjectsData } from '@/lib/types'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Projects | Earthwatch Conservation',
  description: 'Browse our projects.',
}

async function getProjects() {
  try {
    const client = getClient()
    const data = await client.raw(GET_PROJECTS, { first: 50 })
    return data?.nodeProjects?.nodes || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export default async function ProjectsPage() {
  const items = await getProjects()

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <section className="relative bg-primary-900 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80&fit=crop)' }} />
        <div className="absolute inset-0 bg-primary-950/40" />
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" className="fill-stone-50" />
        </svg>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6">Conservation Projects</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">Science-driven initiatives protecting ecosystems and wildlife around the world.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Projects Yet</h2>
              <p className="text-gray-500">
                Projects will appear here once content is imported.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item: any) => (
                <ProjectCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
