'use client'

import { DrupalHomepage } from '@/lib/types'
import { TreePine, Globe, Leaf, Shield } from 'lucide-react'

interface StatsSectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

const defaultStats = [
  { value: '50+', label: 'Active Projects', icon: 'tree' },
  { value: '12', label: 'Countries Protected', icon: 'globe' },
  { value: '200K', label: 'Acres Restored', icon: 'leaf' },
  { value: '85', label: 'Species Safeguarded', icon: 'shield' },
]

const iconMap: Record<string, any> = {
  tree: TreePine,
  globe: Globe,
  leaf: Leaf,
  shield: Shield,
}

export default function StatsSection({ homepageContent }: StatsSectionProps) {
  const stats = (homepageContent as any)?.stats || (homepageContent as any)?.statsItems || []
  const displayStats = stats.length > 0 ? stats : defaultStats

  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-900 mb-4">Our Impact</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Decades of science-driven conservation work protecting ecosystems around the world.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStats.map((stat: any, i: number) => {
            const iconKey = stat.icon?.toLowerCase() || Object.keys(iconMap)[i % Object.keys(iconMap).length]
            const IconComponent = iconMap[iconKey] || TreePine
            return (
              <div key={stat.id || i} className="bg-white rounded-2xl p-8 text-center shadow-sm border border-stone-200 hover:shadow-md transition-shadow duration-300">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <IconComponent className="w-7 h-7 text-primary-700" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary-800 font-serif mb-2">{stat.value || stat.number || stat.statValue || stat.title}</div>
                <div className="text-gray-600 font-medium">{stat.label || stat.statLabel || stat.description?.processed?.replace(/<[^>]*>/g, '') || ''}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
