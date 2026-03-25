import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function ProyectosPage() {
  const projects = await prisma.project.findMany({
    include: {
      client: true,
      phases: {
        orderBy: { displayOrder: 'asc' }
      },
      team: { include: { user: true } },
    },
    orderBy: { createdAt: 'desc' }
  })

  const formatDate = (date: Date | null) => {
    if (!date) return 'Sin fecha'
    return new Intl.DateTimeFormat('es-ES', { month: 'short', day: 'numeric' }).format(date)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVO': return 'var(--primary)'
      case 'COMPLETADO': return 'var(--success)'
      case 'LEAD': return 'var(--warning)'
      case 'CANCELADO': return 'var(--danger)'
      default: return 'var(--text-muted)'
    }
  }

  return (
    <div className="p-6">
      <div className="dashboard-header" style={{ marginBottom: '30px' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Proyectos</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '5px' }}>Vista unificada de obras y contratos vigentes.</p>
        </div>
        <Link href="/admin/proyectos/nuevo" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Nuevo Proyecto
        </Link>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '24px',
        marginTop: '20px'
      }}>
        {projects.map(p => {
          const totalPhases = p.phases.length
          const completedPhases = p.phases.filter(ph => ph.status === 'COMPLETADA').length
          const progress = totalPhases > 0 ? Math.round((completedPhases / totalPhases) * 100) : 0
          const statusColor = getStatusColor(p.status)

          return (
            <Link href={`/admin/proyectos/${p.id}`} key={p.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card h-full" style={{ 
                padding: '24px', 
                borderRadius: '16px', 
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                aspectRatio: '1 / 1',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Background Accent */}
                <div style={{ 
                    position: 'absolute', top: 0, right: 0, 
                    width: '60px', height: '60px', 
                    background: `linear-gradient(135deg, transparent 50%, ${statusColor}15 50%)`,
                    zIndex: 0
                }}></div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
                    <div style={{ 
                        padding: '6px 12px', 
                        borderRadius: '20px', 
                        fontSize: '0.75rem', 
                        fontWeight: 'bold',
                        backgroundColor: `${statusColor}15`,
                        color: statusColor,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                      {p.status}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '500' }}>
                      {formatDate(p.createdAt)}
                    </div>
                  </div>

                  <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', fontWeight: '700', lineHeight: '1.3' }}>{p.title}</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
                    {p.client?.name || 'Cliente sin asignar'}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Presupuesto</span>
                          <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text)' }}>
                              $ {Number(p.estimatedBudget).toLocaleString()}
                          </span>
                      </div>
                      
                      <div style={{ marginTop: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '600' }}>
                          <span>Avance de Obra</span>
                          <span>{progress}%</span>
                        </div>
                        <div style={{ height: '6px', backgroundColor: 'var(--bg-deep)', borderRadius: '10px', overflow: 'hidden' }}>
                          <div style={{ 
                              width: `${progress}%`, 
                              height: '100%', 
                              backgroundColor: statusColor,
                              transition: 'width 1s ease-out'
                          }}></div>
                        </div>
                      </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>{p.team.length}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>{completedPhases}/{totalPhases}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>{(p.phases as any[]).reduce((acc, ph) => acc + (ph.estimatedDays || 0), 0)}d</span>
                    </div>
                </div>
              </div>
            </Link>
          )
        })}

        {projects.length === 0 && (
          <div style={{ 
            gridColumn: '1 / -1', 
            padding: '80px 20px', 
            textAlign: 'center', 
            backgroundColor: 'var(--bg-deep)', 
            borderRadius: '24px',
            border: '2px dashed var(--border-color)'
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1" style={{ marginBottom: '15px' }}>
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <h3 style={{ color: 'var(--text)', marginBottom: '8px' }}>No hay proyectos aún</h3>
            <p style={{ color: 'var(--text-muted)' }}>Comienza creando tu primer proyecto de obra o mantenimiento.</p>
          </div>
        )}
      </div>

    </div>
  )
}
