'use client'

import Link from 'next/link'
import { DrupalHomepage, DrupalProject } from '@/lib/types'
import { MapPin, ArrowRight } from 'lucide-react'
import ResponsiveImage from './ResponsiveImage'

interface ProjectsPreviewProps {
  homepageContent?: DrupalHomepage | null
  projects?: DrupalProject[]
}

export default function ProjectsPreview({ homepageContent, projects = [] }: ProjectsPreviewProps) {
  const sectionTitle = homepageContent?.featuredProjectsTitle || 'Featured Projects'

  if (projects.length === 0) return null

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{sectionTitle}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover our conservation initiatives protecting habitats and wildlife across the region.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link key={project.id} href={project.path || `/projects/${project.id}`} className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-teal-600 to-emerald-700">
                {project.image?.url ? (
                  <ResponsiveImage src={project.image.url} alt={project.image.alt || project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" variations={project.image.variations} targetWidth={400} />
                ) : (<div className="absolute inset-0 flex items-center justify-center"><MapPin className="w-16 h-16 text-white/50" /></div>)}
                {project.projectArea && project.projectArea.length > 0 && (
                  <div className="absolute top-4 left-4 bg-lime-500 text-teal-900 px-3 py-1 rounded-full text-sm font-semibold">{project.projectArea[0].name}</div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-700 transition-colors">{project.title}</h3>
                {project.location && (<div className="flex items-center gap-1 text-sm text-gray-500 mb-4"><MapPin className="w-4 h-4" /><span>{project.location}</span></div>)}
                <div className="flex items-center text-teal-700 font-medium group-hover:gap-2 transition-all">Learn more<ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" /></div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/projects" className="inline-flex items-center px-8 py-4 bg-teal-700 text-white rounded-lg hover:bg-teal-600 transition-colors font-semibold">View All Projects<ArrowRight className="w-5 h-5 ml-2" /></Link>
        </div>
      </div>
    </section>
  )
}
