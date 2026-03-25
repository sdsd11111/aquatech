'use client'

import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts'

const COLORS = ['#38BDF8', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6']

export default function ReportsClient({ statusData, typeData, financials, activityData }: any) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
      
      {/* Financial Summary */}
      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <h3 style={{ marginBottom: '20px' }}>Comparativa Financiera Global</h3>
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Presupuesto Estimado vs Costo Real</span>
              <span style={{ fontWeight: 'bold' }}>
                {Math.round((financials.totalReal / financials.totalBudget) * 100 || 0)}% consumido
              </span>
            </div>
            <div className="progress-bar" style={{ height: '24px' }}>
              <div 
                className="progress-fill" 
                style={{ 
                  width: `${Math.min(100, (financials.totalReal / financials.totalBudget) * 100 || 0)}%`,
                  backgroundColor: financials.totalReal > financials.totalBudget ? 'var(--danger)' : 'var(--primary)'
                }}
              ></div>
            </div>
            <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimado Total</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>$ {financials.totalBudget.toLocaleString()}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Gasto Real</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: financials.totalReal > financials.totalBudget ? 'var(--danger)' : 'var(--success)' }}>
                  $ {financials.totalReal.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: '300px', height: '150px' }}>
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={[
                 { name: 'Estimado', value: financials.totalBudget },
                 { name: 'Real', value: financials.totalReal }
               ]}>
                 <XAxis dataKey="name" hide />
                 <Tooltip cursor={{fill: 'transparent'}} />
                 <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                   <Cell fill="#38BDF8" />
                   <Cell fill={financials.totalReal > financials.totalBudget ? '#EF4444' : '#22C55E'} />
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Projects by Status */}
      <div className="card" style={{ height: '400px' }}>
        <h3 style={{ marginBottom: '20px' }}>Proyectos por Estado</h3>
        <ResponsiveContainer width="100%" height="85%">
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              label={({name, percent}) => `${name} ${(percent ? percent * 100 : 0).toFixed(0)}%`}
            >
              {statusData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Projects by Type */}
      <div className="card" style={{ height: '400px' }}>
        <h3 style={{ marginBottom: '20px' }}>Distribución por Tipo</h3>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={typeData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" width={100} stroke="#94A3B8" />
            <Tooltip />
            <Bar dataKey="value" fill="#38BDF8" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Activity Timeline */}
      <div className="card" style={{ gridColumn: '1 / -1', height: '350px' }}>
        <h3 style={{ marginBottom: '20px' }}>Actividad Mensual (Últimos 6 meses)</h3>
        <ResponsiveContainer width="100%" height="80%">
          <LineChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
            <XAxis dataKey="name" stroke="#94A3B8" />
            <YAxis stroke="#94A3B8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#132238', border: '1px solid #2D3748' }}
              itemStyle={{ color: '#38BDF8' }}
            />
            <Line type="monotone" dataKey="value" stroke="#38BDF8" strokeWidth={3} dot={{ r: 6, fill: '#38BDF8' }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
