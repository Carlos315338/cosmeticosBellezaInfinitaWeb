// app/dashboard/finanzas/page.tsx
'use client';

import DashboardLayout from '@/app/ui/DashboardLayout';
import TimeDisplay from '@/app/ui/TimeDisplay';

export default function ReporteVentasPage() {
  return (
    <DashboardLayout userName="Carlos Stiven Viveros Palma">
      <div className="container mt-4">
        <div className="row">
          <div className="col-8">
            <h1 className="text-start">Reporte de Ventas</h1>
          </div>
          <div className="col-4 text-end">
            <TimeDisplay />
          </div>
        </div>

        <div className="card mt-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img src="/images/more.png" alt="Icono" className="me-2" style={{ width: '24px' }} />
              <h2 className="h5 mb-0">Lista de Ventas</h2>
            </div>
            <div className="input-group w-50">
              <input type="text" className="form-control" placeholder="Buscar por cliente" />
              <button className="btn btn-outline-secondary" type="button">
                <img src="/images/search.png" alt="Buscar" style={{ width: '20px' }} />
              </button>
            </div>
          </div>

          <div className="card-footer d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <label className="me-2">Rango de Fechas:</label>
              <input type="text" className="form-control me-2" value="01/03/2025 07:00:00" readOnly style={{ width: 'auto' }} />
              <input type="text" className="form-control" value="01/03/2025 22:00:00" readOnly style={{ width: 'auto' }} />
            </div>
            <button className="btn btn-submit">Consultar</button>
          </div>

          <div className="card-body">
            <table className="table table-striped table-hover">
              <thead className="table-light">
                <tr>
                  <th>Factura Nº</th>
                  <th>Cliente</th>
                  <th>Identificación</th>
                  <th>Fecha</th>
                  <th>Neto</th>
                  <th>IVA</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={7}>&nbsp;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-submit" onClick={() => window.print()}>Imprimir Reporte</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
