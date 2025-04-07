'use client';

import TimeDisplay from '@/app/ui/TimeDisplay';

export default function ClientesListaPage() {
  return (
      <div className="container">
        <div className="row mb-3">
          <div className="col-8 text-start">
            <h1 className="clients__title pt-2 pb-2">Lista de Clientes</h1>
          </div>
          <div className="col-4 text-end">
            <TimeDisplay />
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="row align-items-center text-white rounded mb-3 px-3 py-2 header-customer">
          <div className="col-sm-8 col-md-6 d-flex align-items-center">
            {/* Puedes agregar un ícono o título aquí */}
          </div>
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
                <th>Identificación</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Correo</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-primary me-1">✏️</button>
                    <button className="btn btn-sm btn-outline-danger">🗑️</button>
                  </td>
                  <td>12345678{index}</td>
                  <td>Nombre Cliente {index + 1}</td>
                  <td>Dirección {index + 1}</td>
                  <td>cliente{index + 1}@correo.com</td>
                  <td>32000000{index}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    
  );
}