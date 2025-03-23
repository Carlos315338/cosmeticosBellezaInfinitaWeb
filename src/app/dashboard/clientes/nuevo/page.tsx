'use client';

import DashboardLayout from '@/app/ui/DashboardLayout';

export default function ClientesNuevoPage() {
  return (
    <DashboardLayout userName="Carlos Stiven Viveros Palma">
      <div className="container">
        <h1 className="pt-4 pb-3">Registrar Cliente</h1>
        <form className="container-form pb-5">
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Primer Nombre</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Segundo Nombre</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Primer Apellido</label>
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Segundo Apellido</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Identificación</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Correo Electrónico</label>
              <input type="email" className="form-control" />
            </div>
          </div>

          <p>Dirección</p>
          <div className="row mb-3">
            <div className="col-md-2">
              <label className="form-label">Tipo de vía</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-2">
              <label className="form-label">N° o Nombre de vía</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-2">
              <label className="form-label">Prefijo</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-2">
              <label className="form-label">Número de vía</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-2">
              <label className="form-label">Prefijo del cuadrante</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-2">
              <label className="form-label">Número de placa</label>
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Ciudad</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Barrio</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Comuna</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Teléfono</label>
              <input type="tel" className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Celular</label>
              <input type="tel" className="form-control" />
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