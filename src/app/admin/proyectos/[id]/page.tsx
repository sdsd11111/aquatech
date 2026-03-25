import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProjectDetailClient from './ProjectDetailClient'

export const dynamic = 'force-dynamic'

export default async function ProyectoDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const project = await prisma.project.findUnique({
    where: { id: Number(id) },
    include: {
      client: true,
      phases: { orderBy: { displayOrder: 'asc' } },
      team: { include: { user: true } },
      expenses: { orderBy: { date: 'desc' } }, // Fetch all for comparison
      dayRecords: { 
        orderBy: { createdAt: 'desc' },
        include: { user: true }
      },
      chatMessages: {
        orderBy: { createdAt: 'desc' },
        include: { 
          user: true, 
          phase: true,
          media: true 
        }
      }
    }
  })

  if (!project) notFound()

  const availableOperators = await prisma.user.findMany({
    where: { role: 'OPERATOR' },
    select: { id: true, name: true, phone: true }
  })

  // Serialize to plain JSON to handle Prisma Decimal objects
  const serializedProject = JSON.parse(JSON.stringify(project))

  return <ProjectDetailClient project={serializedProject} availableOperators={availableOperators} />
}
