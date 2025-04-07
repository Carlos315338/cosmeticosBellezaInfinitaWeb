'use client';

import DashboardLayout from '@/app/ui/DashboardLayout';

export default function UsuariosNuevoPage() {
  return (
    
      <div className="container">
        <h1 className="pt-4 pb-3">Registrar Usuarios</h1>

        <form className="container-form pb-5">
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Nombre del usuario</label>
              <input type="text" className="form-control" placeholder="Ingrese el nombre" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Apellido del usuario</label>
              <input type="text" className="form-control" placeholder="Ingrese el apellido" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Identificación</label>
              <input type="text" className="form-control" placeholder="Ingrese la identificación" />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Fecha de nacimiento</label>
              <input type="date" className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Teléfono</label>
              <input type="text" className="form-control" placeholder="Ingrese el teléfono" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Rol</label>
              <input type="text" className="form-control" placeholder="Ingrese el rol" />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Contraseña</label>
              <input type="password" className="form-control" placeholder="Ingrese la contraseña" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Confirmar contraseña</label>
              <input type="password" className="form-control" placeholder="Repita la contraseña" />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <a href="#" className="btn btn-cancel">Cancelar</a>
            <button type="submit" className="btn btn-submit">Guardar cambios</button>
          </div>
        </form>
      </div>
    
  );
}
