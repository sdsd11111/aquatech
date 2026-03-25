'use client'

import { jsPDF } from 'jspdf'
import Link from 'next/link'

export default function QuoteDetailClient({ quote }: any) {
  
  const generatePDF = () => {
    const doc = new jsPDF()
    const primaryColor = '#38BDF8'
    
    // Header
    doc.setFillColor(12, 26, 42) // bg-deep
    doc.rect(0, 0, 210, 40, 'F')
    
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text('AQUATECH', 20, 25)
    
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('COTIZACIÓN # ' + quote.id, 150, 25)
    doc.text('Fecha: ' + new Date(quote.createdAt).toLocaleDateString(), 150, 32)

    // Client Info
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Información del Cliente', 20, 55)
    
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(quote.client.name, 20, 65)
    doc.text(quote.client.email || '', 20, 72)
    doc.text(quote.client.phone || '', 20, 79)
    doc.text(quote.client.address || '', 20, 86)

    // Items Table Header
    doc.setFillColor(240, 240, 240)
    doc.rect(20, 100, 170, 10, 'F')
    doc.setFont('helvetica', 'bold')
    doc.text('Descripción', 25, 107)
    doc.text('Cant.', 120, 107)
    doc.text('Precio', 145, 107)
    doc.text('Total', 170, 107)

    // Items
    let y = 117
    doc.setFont('helvetica', 'normal')
    quote.items.forEach((item: any) => {
      doc.text(item.description, 25, y)
      doc.text(item.quantity.toString(), 125, y)
      doc.text(item.unitPrice.toLocaleString(), 145, y)
      doc.text(item.total.toLocaleString(), 170, y)
      y += 10
      
      if (y > 270) {
        doc.addPage()
        y = 20
      }
    })

    // Totals
    y += 10
    doc.setDrawColor(200, 200, 200)
    doc.line(120, y, 190, y)
    y += 10
    doc.text('Subtotal:', 140, y)
    doc.text('$ ' + quote.totalAmount.toLocaleString(), 170, y)
    
    y += 7
    doc.text('Impuestos (15%):', 140, y)
    doc.text('$ ' + (quote.totalAmount * 0.15).toLocaleString(), 170, y)
    
    y += 10
    doc.setFont('helvetica', 'bold')
    doc.text('TOTAL:', 140, y)
    doc.text('$ ' + (quote.totalAmount * 1.15).toLocaleString(), 170, y)

    // Footer
    doc.setFontSize(9)
    doc.setTextColor(150, 150, 150)
    doc.text('Gracias por preferir Aquatech — Innovación Hidráulica', 105, 285, { align: 'center' })

    doc.save(`Cotizacion_Aquatech_${quote.id}.pdf`)
  }

  return (
    <>
      <div className="dashboard-header" style={{ marginBottom: '30px' }}>
        <div>
          <Link href="/admin/cotizaciones" style={{ color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Volver a Cotizaciones
          </Link>
          <h2>Detalle de Cotización #{quote.id}</h2>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button className="btn btn-ghost" onClick={() => window.print()}>Imprimir Pantalla</button>
          <button className="btn btn-primary" onClick={generatePDF}>Descargar PDF Oficial</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '20px' }}>
        <div className="card" style={{ padding: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid var(--primary)', paddingBottom: '20px', marginBottom: '30px' }}>
            <div>
              <h1 style={{ color: 'var(--primary)', margin: 0 }}>AQUATECH</h1>
              <p style={{ color: 'var(--text-muted)' }}>Loja, Ecuador</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h3 style={{ margin: 0 }}>COTIZACIÓN</h3>
              <p style={{ margin: '5px 0' }}>#{quote.id}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Fecha: {new Date(quote.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h4 style={{ textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '10px' }}>Cliente</h4>
            <p style={{ margin: '2px 0', fontSize: '1.2rem', fontWeight: 'bold' }}>{quote.client.name}</p>
            <p style={{ margin: '2px 0', color: 'var(--text-muted)' }}>{quote.client.address}, {quote.client.city}</p>
            <p style={{ margin: '2px 0', color: 'var(--text-muted)' }}>{quote.client.phone}</p>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-deep)', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Descripción</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Cant.</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Unitario</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {quote.items.map((item: any) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px' }}>{item.description}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{item.quantity}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>$ {item.unitPrice.toLocaleString()}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>$ {item.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ width: '250px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                <span>$ {quote.totalAmount.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Impuestos (15%)</span>
                <span>$ {(quote.totalAmount * 0.15).toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '2px solid var(--primary)', fontSize: '1.4rem', fontWeight: 'bold' }}>
                <span>TOTAL</span>
                <span>$ {(quote.totalAmount * 1.15).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="card" style={{ marginBottom: '20px' }}>
            <h3>Estado de la Propuesta</h3>
            <div style={{ marginTop: '15px' }}>
              <select className="form-input" defaultValue={quote.status} style={{ marginBottom: '10px' }}>
                <option value="BORRADOR">Borrador</option>
                <option value="ENVIADA">Enviada</option>
                <option value="ACEPTADA">Aceptada</option>
                <option value="RECHAZADA">Rechazada</option>
              </select>
              <button className="btn btn-primary" style={{ width: '100%' }}>Actualizar Estado</button>
            </div>
          </div>

          <div className="card">
            <h3>Notas Internas</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '10px' }}>
              {quote.notes || 'No hay notas adicionales para esta cotización.'}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
