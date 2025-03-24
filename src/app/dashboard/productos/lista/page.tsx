'use client';

import DashboardLayout from '@/app/ui/DashboardLayout';
import TimeDisplay from '@/app/ui/TimeDisplay';

export default function ProductosListaPage() {
  return (
    <DashboardLayout userName="Carlos Stiven Viveros Palma">
      <div className="container">
        <div className="row mb-3">
          <div className="col-8 text-start">
            <h1 className="products__tittle pt-2 pb-2">Lista de Productos</h1>
          </div>
          <div className="col-4 text-end">
            <TimeDisplay />
          </div>
        </div>

        {/* Buscador */}
        <div className="row align-items-center text-white rounded mb-3 px-3 py-2 header-customer">
          <div className="col-sm-8 col-md-6 d-flex align-items-center" />
          <div className="col-sm-4 col-md-6 d-flex align-items-center justify-content-end">
            <input type="text" className="form-control w-50 me-2" placeholder="Buscar" />
            <img src="/images/search.png" alt="Buscar" className="img-fluid search-icon" style={{ maxWidth: '20px' }} />
          </div>
        </div>

        {/* Tabla */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light text-center">
              <tr>
                <th>Acción</th>
                <th>Código</th>
                <th>Producto</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Proveedor</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-primary me-1">✏️</button>
                    <button className="btn btn-sm btn-outline-danger">🗑️</button>
                  </td>
                  <td>{1000 + index}</td>
                  <td>Producto {index + 1}</td>
                  <td>Descripción {index + 1}</td>
                  <td>$ {10000 + index * 500}</td>
                  <td>{20 + index}</td>
                  <td>Categoría {index + 1}</td>
                  <td>Proveedor {index + 1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
