'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const categories = [
  {
    title: 'Accesorios & Insumos',
    subtitle: 'Todo lo que tu piscina necesita, desde químicos hasta iluminación LED.',
    image: '/images/accesorios-grid.png',
    link: '/accesorios',
    size: 'large'
  },
  {
    title: 'Saunas & Spas',
    subtitle: 'Calor y bienestar terapéutico.',
    image: '/images/jacuzzi-spotlight.png',
    link: '/saunas',
    size: 'small'
  },
  {
    title: 'Piletas & Cascadas',
    subtitle: 'El sonido del agua en tu jardín.',
    image: '/images/hero-pool.png',
    link: '/piletas',
    size: 'small'
  }
]

export default function CategoryGrid() {
  return (
    <section className="bg-white py-12 md:py-24 px-6">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div 
            key={cat.title}
            className={`bg-[#f5f5f7] rounded-[30px] p-10 flex flex-col items-center text-center overflow-hidden h-[500px] border border-black/5 hover:shadow-xl transition-all ${
              cat.size === 'large' ? 'lg:col-span-2' : ''
            }`}
          >
            <h3 className="font-brand font-black text-2xl md:text-3xl mb-2">{cat.title}</h3>
            <p className="text-black/60 mb-6 max-w-xs">{cat.subtitle}</p>
            <Link 
              href={cat.link} 
              className="text-[#0070C0] font-bold hover:underline flex items-center gap-1 group mb-8"
            >
              Comprar ahora
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="relative w-full h-full">
              <Image 
                src={cat.image} 
                alt={cat.title} 
                fill 
                className="object-contain object-bottom hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
