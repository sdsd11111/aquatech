'use client'

import { ChevronDown } from 'lucide-react'

export default function ScrollArrowDivider() {
  const handleScroll = () => {
    const featured = document.getElementById('featured-section')
    if (featured) {
      featured.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-[#004A87] py-16 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Subtle brand glow */}
      <div className="absolute inset-0 bg-black/10" />
      
      <button 
        onClick={handleScroll}
        className="grid grid-cols-3 gap-x-8 hover:scale-110 transition-transform cursor-pointer group relative z-10"
      >
        {/* Column 1: 2 Arrows */}
        <div className="flex flex-col items-center">
            <ChevronDown size={32} strokeWidth={3} className="text-white animate-bounce" />
            <ChevronDown size={32} strokeWidth={3} className="text-white animate-bounce [animation-delay:0.1s] -mt-5" />
        </div>
        
        {/* Column 2: 2 Arrows */}
        <div className="flex flex-col items-center">
            <ChevronDown size={32} strokeWidth={3} className="text-white animate-bounce [animation-delay:0.2s]" />
            <ChevronDown size={32} strokeWidth={3} className="text-white animate-bounce [animation-delay:0.3s] -mt-5" />
        </div>

        {/* Column 3: 2 Arrows */}
        <div className="flex flex-col items-center">
            <ChevronDown size={32} strokeWidth={3} className="text-white animate-bounce [animation-delay:0.4s]" />
            <ChevronDown size={32} strokeWidth={3} className="text-white animate-bounce [animation-delay:0.5s] -mt-5" />
        </div>
      </button>
    </div>
  )
}
