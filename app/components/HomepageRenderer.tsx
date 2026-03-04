'use client'

import Header from './Header'
import HeroSection from './HeroSection'
import StatsSection from './StatsSection'
import CTASection from './CTASection'
import ErrorBoundary from './ErrorBoundary'
import { DrupalHomepage } from '@/lib/types'
import { TreePine, Globe, Leaf, Shield, Mountain, Feather } from 'lucide-react'

interface HomepageRendererProps {
  homepageContent: DrupalHomepage | null | undefined
}

const missionItems = [
  { icon: TreePine, label: 'Reforestation', description: 'Planting native species' },
  { icon: Globe, label: 'Global Reach', description: '12 countries and counting' },
  { icon: Leaf, label: 'Habitat Restoration', description: 'Recovering lost ecosystems' },
  { icon: Shield, label: 'Species Protection', description: 'Safeguarding biodiversity' },
  { icon: Mountain, label: 'Land Preservation', description: 'Securing wild spaces' },
  { icon: Feather, label: 'Wildlife Monitoring', description: 'Science-based tracking' },
]

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80&fit=crop', alt: 'Lush green forest ecosystem' },
  { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80&fit=crop', alt: 'Morning mist over protected valley' },
  { src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&q=80&fit=crop', alt: 'Wildlife in natural habitat' },
  { src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80&fit=crop', alt: 'Aerial view of conserved landscape' },
]

export default function HomepageRenderer({ homepageContent }: HomepageRendererProps) {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <ErrorBoundary><HeroSection homepageContent={homepageContent} /></ErrorBoundary>
      <ErrorBoundary><StatsSection homepageContent={homepageContent} /></ErrorBoundary>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-900 mb-4">How We Protect</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Our multi-faceted approach combines scientific research, community engagement, and on-the-ground conservation action.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {missionItems.map((item) => (
              <div key={item.label} className="text-center group">
                <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-100 transition-colors duration-300 border-2 border-primary-100">
                  <item.icon className="w-9 h-9 text-primary-600" />
                </div>
                <h3 className="font-semibold text-primary-900 text-sm mb-1">{item.label}</h3>
                <p className="text-gray-500 text-xs">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-900 mb-4">In the Field</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Snapshots from our conservation projects around the world.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm">
                <img src={img.src} alt={img.alt} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-primary-950/0 group-hover:bg-primary-950/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ErrorBoundary><CTASection homepageContent={homepageContent} /></ErrorBoundary>

      {/* Footer */}
      <footer className="relative bg-primary-950 text-white pt-20 pb-12">
        <svg className="absolute -top-1 left-0 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,0 L0,0 Z" className="fill-stone-50" />
        </svg>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-800 rounded-full flex items-center justify-center"><TreePine className="w-5 h-5 text-accent-300" /></div>
                <h3 className="text-2xl font-serif font-bold text-white">Earthwatch Conservation</h3>
              </div>
              <p className="text-primary-200 mb-6 max-w-md leading-relaxed">Protecting biodiversity and restoring ecosystems through science-driven conservation and community engagement since 1985.</p>
              <div className="flex gap-3">
                <span className="inline-flex items-center bg-primary-900 rounded-full px-3 py-1 text-xs text-primary-200"><Globe className="w-3 h-3 mr-1" /> 12 Countries</span>
                <span className="inline-flex items-center bg-primary-900 rounded-full px-3 py-1 text-xs text-primary-200"><Leaf className="w-3 h-3 mr-1" /> 501(c)(3) Nonprofit</span>
              </div>
            </div>
            <div>
              <h4 className="font-serif font-semibold text-white mb-4 text-lg">Visit Us</h4>
              <ul className="space-y-3 text-primary-200 text-sm">
                <li>8200 Conservation Way</li>
                <li>Asheville, NC 28801</li>
                <li className="pt-2 font-semibold text-accent-300">Office Hours</li>
                <li>Mon - Fri: 9am - 5pm</li>
                <li>Field Office: By Appointment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-semibold text-white mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-3 text-primary-200 text-sm">
                <li><a href="/projects" className="hover:text-accent-300 transition-colors">Projects</a></li>
                <li><a href="/species" className="hover:text-accent-300 transition-colors">Species</a></li>
                <li><a href="/events" className="hover:text-accent-300 transition-colors">Events</a></li>
                <li><a href="/news" className="hover:text-accent-300 transition-colors">News</a></li>
                <li><a href="/contact" className="hover:text-accent-300 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-primary-300 text-sm">
            <p>&copy; {new Date().getFullYear()} Earthwatch Conservation. All rights reserved.</p>
            <p className="text-primary-400 text-xs">Protecting nature, preserving life</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
