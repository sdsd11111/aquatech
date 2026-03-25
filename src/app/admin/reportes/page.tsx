import { prisma } from '@/lib/prisma'
import ReportsClient from './ReportsClient'

export const dynamic = 'force-dynamic'

export default async function ReportesPage() {
  // Aggregate data for reports
  const [
    projectsByStatus,
    projectsByType,
    financialSum,
    monthlyActivity
  ] = await Promise.all([
    prisma.project.groupBy({
      by: ['status'],
      _count: true
    }),
    prisma.project.groupBy({
      by: ['type'],
      _count: true
    }),
    prisma.project.aggregate({
      _sum: { estimatedBudget: true, realCost: true }
    }),
    // Simplified monthly count for the last 6 months
    prisma.project.findMany({
      select: { createdAt: true },
      where: {
        createdAt: { gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) }
      }
    })
  ])

  // Process data for charts
  const statusData = projectsByStatus.map(s => ({ name: s.status, value: s._count }))
  const typeData = projectsByType.map(t => ({ name: t.type, value: t._count }))
  
  const totalBudget = Number(financialSum._sum.estimatedBudget || 0)
  const totalReal = Number(financialSum._sum.realCost || 0)

  // Monthly activity processing
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  const activityMap: Record<string, number> = {}
  monthlyActivity.forEach(p => {
    const m = months[p.createdAt.getMonth()]
    activityMap[m] = (activityMap[m] || 0) + 1
  })
  const activityData = Object.entries(activityMap).map(([name, value]) => ({ name, value }))

  return (
    <div className="p-6">
      <div className="dashboard-header" style={{ marginBottom: '30px' }}>
        <div>
          <h2>Reportes y Análisis</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '5px' }}>Información consolidada de rendimiento y finanzas.</p>
        </div>
      </div>

      <ReportsClient 
        statusData={statusData}
        typeData={typeData}
        financials={{ totalBudget, totalReal }}
        activityData={activityData}
      />
    </div>
  )
}
