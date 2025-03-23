'use client';

import DashboardLayout from '@/app/ui/DashboardLayout';

export default function ProveedoresListaPage() {
  return (
    <DashboardLayout userName="Carlos Stiven Viveros Palma">
      <div className="container">
        <h1 className="pt-4 pb-2">Lista de Proveedores</h1>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light text-center">
              <tr>
                <th>Acción</th>
                <th>NIT Proveedor</th>
                <th>Nombre Proveedor</th>
                <th>Correo Electrónico</th>
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
                  <td>800{index + 1}000</td>
                  <td>Proveedor {index + 1}</td>
                  <td>proveedor{index + 1}@correo.com</td>
                  <td>31200000{index}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}