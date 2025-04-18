"use client";
import CurrentTime from "@/app/ui/CurrentTime";
import Image from "next/image";

export default function UsuariosNuevoPage() {
  return (
    <div className="container p-2">
      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <CurrentTime />
        </div>
      </div>
      <div className="container pb-3 register-customer">
        {/* <!-- Encabezado --> */}
        <div className="row align-items-center text-white rounded mb-3 px-3 py-2 header-customer">
          <div className="col-md-6 d-flex align-items-center">
            <Image
              src="/more.png"
              className="img-fluid me-2 img-menu-burger "
              alt="Logo"
              width={30}
              height={30}
            />
            <h2 className="mb-0">Registrar Usuarios</h2>
          </div>
        </div>
        <form className="row container-form ms-2 me-2 pb-5">
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Nombre del usuario</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese el nombre"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Apellido del usuario</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese el apellido"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Identificación</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese la identificación"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Fecha de nacimiento</label>
              <input type="date" className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese el teléfono"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Rol</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese el rol"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                placeholder="Ingrese la contraseña"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Confirmar contraseña</label>
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
              />
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <a href="#" className="btn btn-cancel">
              Cancelar
            </a>
            <button type="submit" className="btn btn-submit">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
