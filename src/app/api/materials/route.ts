import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q') || ''
  
  const materials = await prisma.material.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { code: { contains: query } },
        { category: { contains: query } }
      ],
      isActive: true
    },
    orderBy: { name: 'asc' }
  })
  
  return NextResponse.json(materials)
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const material = await prisma.material.create({
      data: {
        code: data.code,
        name: data.name,
        description: data.description,
        unit: data.unit,
        unitPrice: Number(data.unitPrice),
        category: data.category,
        stock: Number(data.stock || 0)
      }
    })
    return NextResponse.json(material)
  } catch (error) {
    return NextResponse.json({ error: 'Error creating material' }, { status: 500 })
  }
}
