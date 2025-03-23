'use client';

import DashboardLayout from '@/app/ui/DashboardLayout';

export default function ProveedoresNuevoPage() {
  return (
    <DashboardLayout userName="Carlos Stiven Viveros Palma">
      <div className="container">
        <h1 className="pt-4 pb-3">Registrar Proveedor</h1>

        <form className="container-form pb-5">
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Número de identificación tributaria (NIT)</label>
              <input type="text" className="form-control" placeholder="Ingrese el NIT del proveedor" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Nombre del proveedor</label>
              <input type="text" className="form-control" placeholder="Ingrese el nombre del proveedor" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Correo electrónico del proveedor</label>
              <input type="email" className="form-control" placeholder="Ingrese el correo electrónico" />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Teléfono del proveedor</label>
              <input type="tel" className="form-control" placeholder="Ingrese el teléfono" />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <a href="#" className="btn btn-cancel">Cancelar</a>
            <button type="submit" className="btn btn-submit">Guardar cambios</button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
