import React from 'react';

export default function RecursosPage() {
  return (
    <div className="p-6">
      <div className="dashboard-header mb-6">
        <div>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>Recursos</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '5px', fontSize: '1.1rem' }}>
            Material de apoyo, manuales y datos bancarios
          </p>
        </div>
      </div>

      <div className="grid-3" style={{ alignItems: 'flex-start' }}>
        <div className="card" style={{ gridColumn: '1 / span 1' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Datos para Pagos</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
            Escanea los siguientes códigos QR para pagos rápidos o utiliza los datos de cuenta.
          </p>
          <img src="/images/qr-pagos.png" alt="Códigos QR de Pago" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--border)' }} />
        </div>

        <div className="card" style={{ gridColumn: 'span 2' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Manuales y Documentación (Próximamente)</h3>
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
              <path d="M14 2v6h6" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
              <path d="M10 9H8" />
            </svg>
            <div className="empty-state-title">No hay documentos aún</div>
            <div className="empty-state-text">Aquí se publicarán manuales operativos y guías técnicas en el futuro.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
