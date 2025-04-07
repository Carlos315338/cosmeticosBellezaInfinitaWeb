'use client';

import DashboardLayout from '@/app/ui/DashboardLayout';

export default function VentasNuevoPage() {
  return (
    
      <div className="container">
        <h1 className="pt-4 pb-3">Registrar Ventas</h1>

        <form className="container-form pb-5">
          <div className="mb-3">
            <label className="form-label">Cliente</label>
            <div className="input-group">
              <select className="form-select">
                <option value="">Seleccione un cliente</option>
              </select>
              <button type="button" className="btn btn-submit">Agregar</button>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">N° De Factura</label>
            <input type="text" className="form-control" placeholder="Ingrese el número de factura" />
          </div>

          <div className="mb-3">
            <label className="form-label">Venta N°</label>
            <input type="text" className="form-control" placeholder="Ingrese el número de venta" />
          </div>

          <div className="mb-3">
            <button type="button" className="btn btn-submit w-100">Buscar productos</button>
          </div>

          <div className="mb-3">
            <label className="form-label">Fecha De Emisión</label>
            <input type="date" className="form-control" />
          </div>

          <div className="table-responsive mt-4">
            <table className="table table-bordered table-hover">
              <thead className="table-light text-center">
                <tr>
                  <th>Código</th>
                  <th>Producto</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">
                    <button className="btn btn-outline-danger btn-sm">🗑️</button>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="text-center">
                    <input type="number" className="form-control" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totales */}
          <div className="card shadow-sm mt-4 p-4">
            <h4>Totales</h4>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Subtotal</label>
                <span className="form-control">0</span>
              </div>
              <div className="col-md-6">
                <label className="form-label">Valor Descuento</label>
                <span className="form-control">0</span>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Valor IVA</label>
                <span className="form-control">0</span>
              </div>
              <div className="col-md-6">
                <label className="form-label">Valor Total</label>
                <span className="form-control">0</span>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Efectivo</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Cambio en Efectivo</label>
                <span className="form-control">0</span>
              </div>
            </div>

            <div className="mb-3 pt-4">
              <button type="button" className="btn btn-submit w-100">Finalizar venta</button>
            </div>
          </div>
        </form>
      </div>
    
  );
}
