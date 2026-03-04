'use client'

import { DrupalHomepage } from '@/lib/types'

interface CTASectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function CTASection({ homepageContent }: CTASectionProps) {
  const title = (homepageContent as any)?.ctaTitle || 'Join the Movement'
  const description = (homepageContent as any)?.ctaDescription?.processed || ''
  const primaryLabel = (homepageContent as any)?.ctaPrimary || 'Donate Now'
  const secondaryLabel = (homepageContent as any)?.ctaSecondary || 'Volunteer'

  return (
    <section className="relative bg-primary-800 py-20 overflow-hidden">
      <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0,40 C480,0 960,80 1440,40 L1440,0 L0,0 Z" className="fill-stone-50" />
      </svg>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">{title}</h2>
        {description ? (
          <div className="text-primary-100 mb-10 max-w-2xl mx-auto text-lg" dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          <p className="text-primary-100 mb-10 max-w-2xl mx-auto text-lg">Every contribution supports habitat restoration, species protection, and community-based conservation efforts worldwide.</p>
        )}
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="/contact" className="px-8 py-4 bg-accent-500 text-white rounded-full hover:bg-accent-400 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5">{primaryLabel}</a>
          <a href="/events" className="px-8 py-4 border-2 border-white/40 text-white rounded-full hover:bg-white/10 transition-all duration-200 font-bold text-lg">{secondaryLabel}</a>
        </div>
      </div>
    </section>
  )
}
