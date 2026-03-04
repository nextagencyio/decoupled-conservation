import Link from 'next/link'
import { DrupalEvent } from '@/lib/types'
import ResponsiveImage from './ResponsiveImage'
import { ArrowRight, Globe } from 'lucide-react'

interface EventCardProps {
  item: DrupalEvent
}

export default function EventCard({ item }: EventCardProps) {
  return (
    <Link href={item.path || '#'} className="group bg-white rounded-2xl shadow-sm border border-stone-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative h-52 bg-gradient-to-br from-primary-100 to-primary-200">
        {(item as any).image?.url ? (
          <ResponsiveImage src={(item as any).image.url} alt={(item as any).image.alt || item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" variations={(item as any).image.variations} targetWidth={400} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-primary-200 rounded-full flex items-center justify-center"><Globe className="w-10 h-10 text-primary-500" /></div>
          </div>
        )}
        {(item as any).location && <span className="absolute top-3 left-3 bg-primary-700 text-white text-xs font-semibold px-3 py-1 rounded-full">{(item as any).location}</span>}
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">{item.title}</h3>
        {(item as any).body?.processed && <p className="text-gray-600 text-sm mb-4 line-clamp-2">{(item as any).body.processed.replace(/<[^>]*>/g, '').substring(0, 150)}</p>}
        <div className="flex items-center text-primary-700 font-medium group-hover:gap-2 transition-all text-sm">Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" /></div>
      </div>
    </Link>
  )
}
