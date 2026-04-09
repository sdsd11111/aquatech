'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0B1623]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero-pool.png" 
          alt="Aquatech Luxury Pool" 
          fill 
          priority
          className="object-cover opacity-60 scale-105 animate-[slow-zoom_20s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1623]/60 via-transparent to-[#0B1623]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="font-brand font-black text-5xl md:text-8xl text-white tracking-tighter leading-none mb-6 animate-fade-in-up">
          EL PARAÍSO <br />
          <span className="text-[#38BDF8]">EN TU HOGAR</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/80 font-medium tracking-wide max-w-2xl mb-12 animate-fade-in-up animation-delay-300">
          Diseño y construcción de piscinas de alta gama, hidromasajes y sistemas hídricos inteligentes en Loja y Zamora.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 animate-fade-in-up animation-delay-500">
          <Link 
            href="/cotizador" 
            className="group px-10 py-4 bg-[#0070C0] hover:bg-[#005ea1] text-white font-bold rounded-full text-lg transition-all flex items-center gap-2 shadow-2xl shadow-[#0070C0]/40"
          >
            Iniciar una cotización
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/portafolio" 
            className="text-white hover:text-[#38BDF8] font-bold text-lg flex items-center gap-1 group transition-colors"
          >
            Ver portafolio de obras
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
          <div className="w-1 h-3 bg-white rounded-full" />
        </div>
      </div>

      <style jsx>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-500 { animation-delay: 500ms; }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
