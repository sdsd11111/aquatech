'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function TeamPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState('')
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    role: 'OPERATOR',
    email: '',
    phone: ''
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      if (Array.isArray(data)) {
        setUsers(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
    let pass = ''
    for (let i = 0; i < 10; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setFormData({ ...formData, password: pass })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al crear usuario')
      
      setShowModal(false)
      setFormData({ name: '', username: '', password: '', role: 'OPERATOR', email: '', phone: '' })
      fetchUsers()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDeactivate = async (id: number) => {
    if (!confirm('¿Estás seguro de desactivar a este miembro?')) return
    
    try {
      const res = await fetch(`/api/users?id=${id}`, { method: 'DELETE' })
      if (res.ok) fetchUsers()
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="p-10 text-center">Cargando equipo...</div>

  const admins = users.filter(u => u.role === 'ADMIN')
  const operators = users.filter(u => u.role === 'OPERATOR')

  const formatDate = (date: any) => {
    if (!date) return 'Sin fecha'
    return new Intl.DateTimeFormat('es-ES', { month: 'short', day: 'numeric' }).format(new Date(date))
  }

  return (
    <div className="operator-dashboard">
      <div className="operator-header">
        <div>
          <h2 className="page-title">Equipo Aquatech</h2>
          <p className="page-subtitle">Gestiona los administradores y operadores en campo.</p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => setShowModal(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/>
          </svg>
          Añadir Miembro
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {/* Admins Section */}
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text)', fontWeight: '700' }}>
            <span style={{ width: '4px', height: '18px', backgroundColor: 'var(--success)', borderRadius: '2px' }} />
            Administradores
          </h3>
          <div className="grid-responsive">
            {admins.map(u => (
              <UserCard key={u.id} user={u} onDeactivate={handleDeactivate} formatDate={formatDate} />
            ))}
          </div>
        </div>

        {/* Operators Section */}
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text)', fontWeight: '700' }}>
            <span style={{ width: '4px', height: '18px', backgroundColor: 'var(--primary)', borderRadius: '2px' }} />
            Operadores en Campo
          </h3>
          <div className="grid-responsive">
            {operators.map(u => (
              <UserCard key={u.id} user={u} onDeactivate={handleDeactivate} formatDate={formatDate} />
            ))}
            {operators.length === 0 && (
              <div style={{ gridColumn: '1 / -1', padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)', backgroundColor: 'var(--bg-deep)', borderRadius: '24px', border: '2px dashed var(--border-color)' }}>
                No hay operadores registrados en el sistema.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {showModal && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
          backdropFilter: 'blur(8px)'
        }}>
          <div className="card animate-scale-in" style={{ width: '500px', maxWidth: '95%', padding: '32px', borderRadius: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Añadir Nuevo Miembro</h2>
              <button 
                onClick={() => setShowModal(false)} 
                style={{ background: 'var(--bg-surface)', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {error && <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</div>}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Nombre Completo *</label>
                  <input type="text" className="form-input" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Ej: Juan Pérez" />
                </div>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Usuario *</label>
                  <input type="text" className="form-input" required value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} placeholder="juan.perez" />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Rol del Sistema *</label>
                <select className="form-input" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                  <option value="OPERATOR">Operador (Campo)</option>
                  <option value="ADMIN">Administrador (Oficina)</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Contraseña *</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input type="text" className="form-input" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder="********" />
                  <button type="button" className="btn btn-secondary" onClick={generatePassword} style={{ whiteSpace: 'nowrap' }}>Auto-Generar</button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group" style={{ marginBottom: '30px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Teléfono</label>
                  <input type="text" className="form-input" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+593..." />
                </div>
                <div className="form-group" style={{ marginBottom: '30px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>Email</label>
                  <input type="email" className="form-input" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="juan@aquatech.com" />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Confirmar Registro</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function UserCard({ user, onDeactivate, formatDate }: { user: any, onDeactivate: (id: number) => void, formatDate: (d: any) => string }) {
  const statusColor = user.role === 'ADMIN' ? 'var(--success)' : 'var(--primary)'
  
  return (
    <div className="card h-full" style={{ 
      padding: '24px', 
      borderRadius: '20px', 
      border: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: '320px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Accent Gradient */}
      <div style={{ 
          position: 'absolute', top: 0, right: 0, 
          width: '80px', height: '80px', 
          background: `linear-gradient(135deg, transparent 50%, ${statusColor}10 50%)`,
          zIndex: 0
      }}></div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
          <div style={{ 
              padding: '6px 14px', 
              borderRadius: '20px', 
              fontSize: '0.75rem', 
              fontWeight: 'bold',
              backgroundColor: `${statusColor}15`,
              color: statusColor,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
          }}>
            {user.role}
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '500' }}>
            {formatDate(user.createdAt)}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ 
              width: '60px', height: '60px', 
              borderRadius: '16px', 
              backgroundColor: 'var(--bg-surface)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '1.5rem', 
              color: statusColor, 
              fontWeight: '800', 
              border: `2px solid ${statusColor}40`,
              boxShadow: `0 8px 16px ${statusColor}10`
          }}>
            {user.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: 'var(--text)', lineHeight: '1.2' }}>{user.name}</h3>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px', fontWeight: '500' }}>@{user.username}</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {user.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {user.phone}
            </div>
          )}
          {user.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              {user.email}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              {user.activeProjectsCount || 0}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Proyectos</div>
          </div>
        </div>
        
        <button 
          onClick={() => onDeactivate(user.id)}
          style={{ 
              background: 'rgba(239, 68, 68, 0.05)', 
              border: 'none', 
              color: 'var(--danger)', 
              cursor: 'pointer',
              padding: '8px', 
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
          }}
          title="Desactivar Miembro"
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>
        </button>
      </div>
    </div>
  )
}
