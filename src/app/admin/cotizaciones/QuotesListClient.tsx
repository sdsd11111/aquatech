'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function QuotesListClient({ initialQuotes }: any) {
  const [quotes] = useState(initialQuotes)
  const [filter, setFilter] = useState('ALL')

  const filtered = filter === 'ALL' ? quotes : quotes.filter((q: any) => q.status === filter)

  return (
    <>
      <div className="tabs" style={{ marginBottom: '20px' }}>
        <button onClick={() => setFilter('ALL')} className={`tab ${filter === 'ALL' ? 'active' : ''}`}>Todas</button>
        <button onClick={() => setFilter('BORRADOR')} className={`tab ${filter === 'BORRADOR' ? 'active' : ''}`}>Borradores</button>
        <button onClick={() => setFilter('ENVIADA')} className={`tab ${filter === 'ENVIADA' ? 'active' : ''}`}>Enviadas</button>
        <button onClick={() => setFilter('ACEPTADA')} className={`tab ${filter === 'ACEPTADA' ? 'active' : ''}`}>Aceptadas</button>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-deep)' }}>
              <th style={{ padding: '15px', textAlign: 'left' }}>Cliente</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Proyecto Relacionado</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Fecha</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Estado</th>
              <th style={{ padding: '15px', textAlign: 'right' }}>Total</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((quote: any) => (
              <tr key={quote.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '15px' }}>{quote.client.name}</td>
                <td style={{ padding: '15px', color: 'var(--text-muted)' }}>{quote.project?.title || 'Sin proyecto'}</td>
                <td style={{ padding: '15px' }}>{new Date(quote.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '15px' }}>
                  <span className={`status-badge status-${quote.status.toLowerCase()}`}>
                    {quote.status}
                  </span>
                </td>
                <td style={{ padding: '15px', textAlign: 'right', fontWeight: 'bold', color: 'var(--primary)' }}>
                  $ {quote.totalAmount.toLocaleString()}
                </td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <Link href={`/admin/cotizaciones/${quote.id}`} className="btn btn-ghost btn-sm">Ver Detalle</Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No se encontraron cotizaciones.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
