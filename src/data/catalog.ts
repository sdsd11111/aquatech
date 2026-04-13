export interface Product {
  id: number;
  name: string;
  code: string;
  category: 'Hidromasajes' | 'Turcos' | 'Saunas' | 'Piletas' | 'Tuberías' | 'Agua Potable' | 'Riego' | 'Accesorios';
  price: number;
  promoPrice?: number;
  img: string;
  tags?: string[];
}

export const catalogData: Product[] = [
  // HIDROMASAJES
  {
    id: 1,
    name: "HIDROMASAJE DUO PREMIUM",
    code: "AQ-HID-DUO",
    category: 'Hidromasajes',
    price: 2450.00,
    promoPrice: 2190.00,
    img: "https://cesarweb.b-cdn.net/Hidromasaje-Aquatech/model-duo.webp",
    tags: ['BEST SELLER', 'IBAX TECH']
  },
  {
    id: 2,
    name: "HIDROMASAJE MERENGUE SOCIAL",
    code: "AQ-HID-MER",
    category: 'Hidromasajes',
    price: 3120.00,
    img: "https://cesarweb.b-cdn.net/Hidromasaje-Aquatech/model-merengue.webp",
    tags: ['NEW']
  },
  {
    id: 3,
    name: "RELAX ELITE RECTANGULAR",
    code: "AQ-HID-REL",
    category: 'Hidromasajes',
    price: 1890.00,
    promoPrice: 1750.00,
    img: "https://cesarweb.b-cdn.net/Hidromasaje-Aquatech/model-relax.webp"
  },
  {
    id: 4,
    name: "SWIM SPA PRO FLOW",
    code: "AQ-HID-SWI",
    category: 'Hidromasajes',
    price: 8400.00,
    img: "https://cesarweb.b-cdn.net/Hidromasaje-Aquatech/model-swim.webp",
    tags: ['EXCLUSIVE']
  },
  {
    id: 5,
    name: "SPA EXTERIOR TITANIUM",
    code: "AQ-HID-SPA-T",
    category: 'Hidromasajes',
    price: 5900.00,
    img: "https://cesarweb.b-cdn.net/Hidromasaje-Aquatech/cat-spas.webp"
  },
  {
    id: 6,
    name: "JACUZZI ESQUINERO JADE",
    code: "AQ-HID-JAD",
    category: 'Hidromasajes',
    price: 1650.00,
    img: "https://cesarweb.b-cdn.net/Hidromasaje-Aquatech/cat-jacuzzis.webp"
  },
  {
    id: 7,
    name: "TINA ROMA MINIMALIST",
    code: "AQ-HID-ROM",
    category: 'Hidromasajes',
    price: 1100.00,
    img: "https://cesarweb.b-cdn.net/Hidromasaje-Aquatech/cat-tinas.webp"
  },
  {
    id: 8,
    name: "HIDROMASAJE ZEN CIRCULAR",
    code: "AQ-HID-ZEN",
    category: 'Hidromasajes',
    price: 2800.00,
    img: "https://cesarweb.b-cdn.net/Hidromasaje-Aquatech/hero-hidromasaje.webp"
  },
  {
    id: 9,
    name: "SPA FAMILIAR GRANDE",
    code: "AQ-HID-FAM",
    category: 'Hidromasajes',
    price: 4500.00,
    img: "https://cesarweb.b-cdn.net/home/hero-slider-3.webp"
  },
  {
    id: 10,
    name: "HIDROMASAJE EXECUTIVE",
    code: "AQ-HID-EXE",
    category: 'Hidromasajes',
    price: 3200.00,
    img: "https://cesarweb.b-cdn.net/Hidromasaje-Aquatech/model-duo.webp"
  },
  // TURCOS
  {
    id: 11,
    name: "GENERADOR VAPOR A GAS 20M³",
    code: "AQ-TUR-GAS20",
    category: 'Turcos',
    price: 1850.00,
    promoPrice: 1700.00,
    img: "https://cesarweb.b-cdn.net/home/hero-slider-3.webp",
    tags: ['COMERCIAL']
  },
  {
    id: 12,
    name: "BOMBA SILENCIOSA IBAX",
    code: "AQ-TUR-IBAX",
    category: 'Turcos',
    price: 450.00,
    img: "https://cesarweb.b-cdn.net/home/showroom_interior.webp",
    tags: ['IBAX TECH']
  },
  {
    id: 13,
    name: "TUBERÍA SCH80 ALTA TEMPERATURA",
    code: "AQ-TUR-SCH80",
    category: 'Turcos',
    price: 15.00,
    img: "https://cesarweb.b-cdn.net/home/detalle_ingenieria.webp"
  },
  {
    id: 14,
    name: "TERMOSTATO PTC PERILLA",
    code: "AQ-TUR-PTC",
    category: 'Turcos',
    price: 120.00,
    img: "https://cesarweb.b-cdn.net/home/equipo_trabajo.webp",
    tags: ['ACCESORIO']
  },
  {
    id: 15,
    name: "BOTÓN PULSADOR BALBOA 1144",
    code: "AQ-TUR-BAL1144",
    category: 'Turcos',
    price: 85.00,
    img: "https://cesarweb.b-cdn.net/home/showroom_interior.webp"
  },
  {
    id: 16,
    name: "BASE DE DUCHA ACRÍLICA",
    code: "AQ-TUR-ACR",
    category: 'Turcos',
    price: 250.00,
    img: "https://cesarweb.b-cdn.net/home/matriz_frente.webp",
    tags: ['NUEVO']
  },
  // SAUNAS
  {
    id: 17,
    name: "GENERADOR ELÉCTRICO EMAUX 9KW",
    code: "AQ-SAU-EM9",
    category: 'Saunas',
    price: 950.00,
    promoPrice: 880.00,
    img: "https://cesarweb.b-cdn.net/home/hero-slider-3.webp",
    tags: ['BEST SELLER', 'MADERA']
  },
  {
    id: 18,
    name: "SISTEMA CALEFACCIÓN A GAS 20M³",
    code: "AQ-SAU-GS20",
    category: 'Saunas',
    price: 1800.00,
    img: "https://cesarweb.b-cdn.net/home/showroom_interior.webp",
    tags: ['COMERCIAL']
  },
  {
    id: 19,
    name: "CONTROLADOR DIGITAL EMAUX",
    code: "AQ-SAU-CTD",
    category: 'Saunas',
    price: 210.00,
    img: "https://cesarweb.b-cdn.net/home/detalle_ingenieria.webp"
  },
  {
    id: 20,
    name: "TERMOSTATO PTC PRECISIÓN",
    code: "AQ-SAU-PTC",
    category: 'Saunas',
    price: 135.00,
    img: "https://cesarweb.b-cdn.net/home/equipo_trabajo.webp"
  },
  {
    id: 21,
    name: "KIT PIEDRAS VOLCÁNICAS 20KG",
    code: "AQ-SAU-PD20",
    category: 'Saunas',
    price: 85.00,
    img: "https://cesarweb.b-cdn.net/home/matriz_frente.webp",
    tags: ['ACCESORIO']
  },
  {
    id: 22,
    name: "SET TERMÓMETRO / HIGRÓMETRO",
    code: "AQ-SAU-THM",
    category: 'Saunas',
    price: 45.00,
    img: "https://cesarweb.b-cdn.net/home/hero-slider-2.webp",
    tags: ['ACCESORIO']
  }
];
