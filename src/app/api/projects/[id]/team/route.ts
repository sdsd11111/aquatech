import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { isAdmin } from '@/lib/rbac'
import { notifyUser } from '@/lib/push'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { id } = await params
    const projectId = Number(id)
    const { operatorIds } = await request.json()

    if (!Array.isArray(operatorIds)) {
      return NextResponse.json({ error: 'Formato inválido' }, { status: 400 })
    }

    // Usar una transacción para actualizar el equipo
    let newlyAddedIds: number[] = []
    
    await prisma.$transaction(async (tx) => {
      // Find current team to identify newly added users
      const currentTeam = await tx.projectTeam.findMany({ where: { projectId } })
      const currentIds = currentTeam.map(t => t.userId)
      newlyAddedIds = operatorIds.filter((id: number) => !currentIds.includes(id))

      // 1. Eliminar asignaciones actuales
      await tx.projectTeam.deleteMany({
        where: { projectId: projectId }
      })

      // 2. Crear las nuevas asignaciones
      if (operatorIds.length > 0) {
        await tx.projectTeam.createMany({
          data: operatorIds.map((userId: number) => ({
            projectId,
            userId
          }))
        })
      }
    })

    // Notify newly added users
    if (newlyAddedIds.length > 0) {
      const project = await prisma.project.findUnique({ where: { id: projectId }, select: { title: true } })
      const title = project?.title || 'Nuevo Proyecto'
      
      Promise.allSettled(newlyAddedIds.map(uid => 
        notifyUser(uid, `🚀 Has sido asignado a un proyecto`, `Proyecto: ${title}`, `/admin/operador/proyecto/${projectId}`, `project-${projectId}`)
      )).catch(() => {})
    }

    return NextResponse.json({ success: true, message: 'Equipo actualizado correctamente' })
  } catch (error) {
    console.error('Error actualizando equipo:', error)
    return NextResponse.json(
      { error: 'Error interno al actualizar el equipo' },
      { status: 500 }
    )
  }
}
