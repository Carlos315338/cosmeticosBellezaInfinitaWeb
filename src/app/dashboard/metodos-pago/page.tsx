// app/dashboard/metodos-pago/page.tsx
'use client';

import DashboardLayout from '@/app/ui/DashboardLayout';

export default function MetodosPagoPage() {
  return (
    
      <div className="container">
        <h1 className="pt-4 pb-3">Métodos de Pago</h1>

        {/* Formulario */}
        <form className="container-form pb-3">
          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="metodo-pago" className="form-label">Nombre del método de pago</label>
              <input type="text" id="metodo-pago" className="form-control" placeholder="Ingrese el nombre del método de pago" />
            </div>
          </div>

          <div className="d-flex justify-content-between pb-2 pt-2">
            <button type="button" className="btn btn-submit me-2">Buscar métodos de pago</button>
            <div className="d-flex justify-content-end">
              <a href="#" className="btn btn-cancel me-2">Cancelar</a>
              <button type="submit" className="btn btn-submit">Guardar cambios</button>
            </div>
          </div>
        </form>

        {/* Tabla */}
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-light text-center">
              <tr>
                <th>Acción</th>
                <th>Métodos de Pago</th>
              </tr>
            </thead>
            <tbody>
              {["Métodos de Pago 1", "Métodos de Pago 2"].map((nombre, i) => (
                <tr key={i}>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-primary me-1" title="Editar">✏️</button>
                    <button className="btn btn-sm btn-outline-danger" title="Eliminar">🗑️</button>
                  </td>
                  <td className="text-center">{nombre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    
  );
}
