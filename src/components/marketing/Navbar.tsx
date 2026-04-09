'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronRight } from 'lucide-react'

const navItems = [
  { name: 'Hidromasajes', href: '/hidromasajes' },
  { name: 'Turcos', href: '/turcos' },
  { name: 'Saunas', href: '/saunas' },
  { name: 'Piletas', href: '/piletas' },
  { name: 'Tuberías Termofusión', href: '/tuberias' },
  { name: 'Sistema Agua potable', href: '/agua-potable' },
  { name: 'Sistema de Riego', href: '/riego' },
  { name: 'Accesorios', href: '/accesorios' },
  { name: 'Agencias', href: '/agencias' },
  { name: 'Blog', href: '/blog' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0B1623]/80 backdrop-blur-xl border-b border-white/10 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg border border-white/20 group-hover:border-[#38BDF8]/50 transition-colors">
            <Image 
              src="/logo.jpg" 
              alt="Aquatech Logo" 
              fill 
              className="object-cover"
            />
          </div>
          <span className="font-brand font-black text-xl tracking-tighter text-white uppercase">
            Aqua<span className="text-[#38BDF8]">tech</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              href={item.href}
              className="px-4 py-2 text-[11px] font-brand font-medium uppercase tracking-[0.1em] text-white/70 hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/cotizador" 
            className="px-6 py-2 bg-[#0070C0] hover:bg-[#005ea1] text-white text-xs font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#0070C0]/20"
          >
            COTIZAR AHORA
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="xl:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 top-[72px] bg-[#0B1623] z-40 transition-transform duration-500 xl:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col p-8 gap-6">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between text-2xl font-brand font-bold text-white border-b border-white/5 pb-4 group"
            >
              {item.name}
              <ChevronRight className="text-[#38BDF8] group-hover:translate-x-2 transition-transform" />
            </Link>
          ))}
          <Link 
            href="/cotizador"
            className="mt-4 p-5 bg-[#0070C0] text-center text-white font-bold rounded-xl text-lg shadow-xl shadow-[#0070C0]/20"
          >
            INICIAR PROYECTO
          </Link>
        </div>
      </div>
    </nav>
  )
}
