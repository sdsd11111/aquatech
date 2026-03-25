import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'var(--font-brand)', fontSize: '2rem', marginBottom: '10px' }}>Aquatech</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Página web en construcción.</p>
      <Link href="/admin" className="btn btn-primary">
        Ir al Portal CRM
      </Link>
    </div>
  )
}
