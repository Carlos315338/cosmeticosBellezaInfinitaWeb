// app/dashboard/usuarios/lista/page.tsx
'use client';

import DashboardLayout from '@/app/ui/DashboardLayout';
import TimeDisplay from '@/app/ui/TimeDisplay';

export default function UsuariosListaPage() {
  return (
    <DashboardLayout userName="Carlos Stiven Viveros Palma">
      <div className="container">
        <div className="row mb-3">
          <div className="col-8 text-start">
            <h1 className="users__tittle pt-2 pb-2">Lista de Usuarios</h1>
          </div>
          <div className="col-4 text-end">
            <TimeDisplay />
          </div>
        </div>

        {/* Buscador */}
        <div className="row align-items-center text-white rounded mb-3 px-3 py-2 header-users">
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
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Identificación</th>
                <th>Contraseña</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-primary me-1">✏️</button>
                    <button className="btn btn-sm btn-outline-danger">🗑️</button>
                  </td>
                  <td>Nombre {index + 1}</td>
                  <td>Apellido {index + 1}</td>
                  <td>10000{index}</td>
                  <td>•••••••</td>
                  <td>Administrador</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
