'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f7] text-[#1d1d1f] pt-16 pb-8 px-6">
      <div className="max-w-[1024px] mx-auto">
        {/* Footer Nav */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 border-b border-black/10 pb-12">
          {/* Column 1 */}
          <div className="flex flex-col gap-3">
            <h4 className="font-brand font-bold text-xs uppercase tracking-wider mb-2">Aquatech</h4>
            <Link href="/nosotros" className="text-xs hover:underline opacity-80">Quiénes somos</Link>
            <Link href="/sucursales" className="text-xs hover:underline opacity-80">Nuestras Agencias</Link>
            <Link href="/contacto" className="text-xs hover:underline opacity-80">Contacto</Link>
            <Link href="/blog" className="text-xs hover:underline opacity-80">Blog & Noticias</Link>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            <h4 className="font-brand font-bold text-xs uppercase tracking-wider mb-2">Categorías</h4>
            <Link href="/hidromasajes" className="text-xs hover:underline opacity-80">Hidromasajes</Link>
            <Link href="/saunas" className="text-xs hover:underline opacity-80">Saunas & Turcos</Link>
            <Link href="/piletas" className="text-xs hover:underline opacity-80">Piletas & Cascadas</Link>
            <Link href="/riego" className="text-xs hover:underline opacity-80">Sistemas de Riego</Link>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-3">
            <h4 className="font-brand font-bold text-xs uppercase tracking-wider mb-2">Soporte</h4>
            <Link href="/mantenimiento" className="text-xs hover:underline opacity-80">Servicio Técnico</Link>
            <Link href="/manuales" className="text-xs hover:underline opacity-80">Manuales de Uso</Link>
            <Link href="/garantia" className="text-xs hover:underline opacity-80">Garantías</Link>
            <Link href="/faq" className="text-xs hover:underline opacity-80">Preguntas Frecuentes</Link>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-3">
            <h4 className="font-brand font-bold text-xs uppercase tracking-wider mb-2">Síguenos</h4>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-[#0070C0] transition-colors" title="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </Link>
              <Link href="#" className="hover:text-[#0070C0] transition-colors" title="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </Link>
              <Link href="#" className="hover:text-[#0070C0] transition-colors" title="X (Twitter)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </Link>
              <Link href="#" className="hover:text-[#0070C0] transition-colors" title="WhatsApp">
                <MessageCircle size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] opacity-60">
          <p>© 2026 Aquatech Ecuador. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/privacidad" className="hover:underline">Política de Privacidad</Link>
            <Link href="/cookies" className="hover:underline">Cookies</Link>
            <Link href="/legal" className="hover:underline">Términos Legales</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
