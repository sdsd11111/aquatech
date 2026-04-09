import type { Metadata } from 'next'
import Navbar from '@/components/marketing/Navbar'
import Hero from '@/components/marketing/Hero'
import ServiceSpotlight from '@/components/marketing/ServiceSpotlight'
import CategoryGrid from '@/components/marketing/CategoryGrid'
import Footer from '@/components/marketing/Footer'

export const metadata: Metadata = {
  title: 'Aquatech | Construcción de Piscinas, Hidromasajes y Riego en Loja',
  description: 'Especialistas en ingeniería hidráulica, diseño de piscinas residenciales, saunas y sistemas de riego tecnificado en el sur del Ecuador (Loja y Zamora).',
  keywords: ['piscinas loja', 'hidromasajes ecuador', 'riego automatico loja', 'aquatech', 'saunas ecuador', 'construccion de piscinas'],
  openGraph: {
    title: 'Aquatech | Innovación Hidráulica para tu Hogar',
    description: 'Expertos en crear y mantener el paraíso en tu hogar con tecnología de vanguardia.',
    images: ['/images/hero-pool.png'],
  }
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B1623]">
      {/* Header Fijo */}
      <Navbar />

      {/* Hero Section - Impacto Total */}
      <Hero />

      {/* Spotlight - Productos/Servicios Destacados (Estilo Apple) */}
      <ServiceSpotlight />

      {/* Grid de Categorías y Accesorios */}
      <CategoryGrid />

      {/* Footer Institucional */}
      <Footer />
    </main>
  )
}
