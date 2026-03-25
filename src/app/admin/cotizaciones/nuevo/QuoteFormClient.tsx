'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

export default function QuoteFormClient({ clients, materials, prefetchedProject }: any) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedClientId, setSelectedClientId] = useState(prefetchedProject?.clientId || '')
  const [notes, setNotes] = useState('')
  const [validUntil, setValidUntil] = useState('')
  const [items, setItems] = useState<any[]>(prefetchedProject?.items || [])

  const totalAmount = useMemo(() => {
    return items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0)
  }, [items])

  const addItem = (materialId: number) => {
    const mat = materials.find((m: any) => m.id === materialId)
    if (!mat) return
    setItems([...items, {
      materialId: mat.id,
      description: mat.name,
      quantity: 1,
      unitPrice: mat.unitPrice
    }])
  }

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items]
    newItems[index][field] = value
    setItems(newItems)
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedClientId) return alert("Selecciona un cliente")
    if (items.length === 0) return alert("Agrega al menos un item")

    setLoading(true)
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: selectedClientId,
          projectId: prefetchedProject?.id,
          notes,
          validUntil,
          items
        })
      })

      if (res.ok) {
        router.push('/admin/cotizaciones')
        router.refresh()
      }
    } catch (err) {
      alert("Error al guardar")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
      
      <div className="card">
        <h3 style={{ marginBottom: '20px' }}>Conceptos y Materiales</h3>
        
        {/* Material Selector */}
        <div style={{ padding: '15px', backgroundColor: 'var(--bg-deep)', borderRadius: '8px', marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem' }}>Añadir del catálogo:</label>
          <select 
            className="form-input" 
            onChange={(e) => {
              if (e.target.value) addItem(Number(e.target.value))
              e.target.value = ''
            }}
          >
            <option value="">-- Selecciona un material --</option>
            {materials.map((m: any) => (
              <option key={m.id} value={m.id}>{m.code} - {m.name} ($ {m.unitPrice})</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'grid', gap: '15px' }}>
          {items.map((item, index) => (
            <div key={index} style={{ display: 'grid', gridTemplateColumns: '2fr 80px 120px 120px 40px', gap: '10px', alignItems: 'flex-end', paddingBottom: '15px', borderBottom: '1px solid var(--border-color)' }}>
              <div className="form-group">
                <label style={{ fontSize: '0.75rem' }}>Descripción</label>
                <input className="form-input" value={item.description} onChange={(e) => updateItem(index, 'description', e.target.value)} />
              </div>
              <div className="form-group">
                <label style={{ fontSize: '0.75rem' }}>Cant.</label>
                <input type="number" className="form-input" value={item.quantity} onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label style={{ fontSize: '0.75rem' }}>Precio ($)</label>
                <input type="number" className="form-input" value={item.unitPrice} onChange={(e) => updateItem(index, 'unitPrice', Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label style={{ fontSize: '0.75rem' }}>Subtotal</label>
                <div style={{ height: '40px', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>$ {(item.quantity * item.unitPrice).toLocaleString()}</div>
              </div>
              <button 
                type="button" 
                onClick={() => removeItem(index)}
                style={{ height: '40px', background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          ))}

          {items.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', border: '1px dashed var(--border-color)', borderRadius: '8px' }}>
              No hay items en esta cotización aún.
            </div>
          )}
        </div>

        <div style={{ marginTop: '20px' }}>
          <label>Notas adicionales / Condiciones</label>
          <textarea 
            className="form-input" 
            style={{ height: '100px', marginTop: '10px' }} 
            value={notes} 
            onChange={e => setNotes(e.target.value)}
            placeholder="Ej: Pago 50% anticipado, validez de 15 días..."
          ></textarea>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        <div className="card">
          <h3 style={{ marginBottom: '20px' }}>Resumen y Cliente</h3>
          
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label>Cliente</label>
            <select className="form-input" value={selectedClientId} onChange={e => setSelectedClientId(e.target.value)} required>
              <option value="">-- Selecciona --</option>
              {clients.map((c: any) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label>Válida hasta</label>
            <input type="date" className="form-input" value={validUntil} onChange={e => setValidUntil(e.target.value)} />
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
              <span>$ {totalAmount.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Impuestos (15%)</span>
              <span>$ {(totalAmount * 0.15).toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
              <span>TOTAL</span>
              <span>$ {(totalAmount * 1.15).toLocaleString()}</span>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '30px' }}
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Generar Cotización'}
          </button>
        </div>
      </div>

    </form>
  )
}
