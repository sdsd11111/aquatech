import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const quotes = await prisma.quote.findMany({
    include: {
      client: { select: { name: true } },
      project: { select: { title: true } }
    },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(quotes)
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    // Calculate total if not provided
    const items = data.items || []
    const totalAmount = items.reduce((acc: number, item: any) => acc + (Number(item.quantity) * Number(item.unitPrice)), 0)

    const quote = await prisma.quote.create({
      data: {
        clientId: Number(data.clientId),
        projectId: data.projectId ? Number(data.projectId) : null,
        status: data.status || 'BORRADOR',
        totalAmount,
        notes: data.notes,
        validUntil: data.validUntil ? new Date(data.validUntil) : null,
        items: {
          create: items.map((item: any) => ({
            materialId: item.materialId ? Number(item.materialId) : null,
            description: item.description,
            quantity: Number(item.quantity),
            unitPrice: Number(item.unitPrice),
            total: Number(item.quantity) * Number(item.unitPrice)
          }))
        }
      },
      include: { items: true }
    })
    
    return NextResponse.json(quote)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error creating quote' }, { status: 500 })
  }
}
