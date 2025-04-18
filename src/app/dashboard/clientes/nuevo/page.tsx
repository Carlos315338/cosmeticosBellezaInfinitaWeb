"use client";
import CurrentTime from "@/app/ui/CurrentTime";
import Image from "next/image";

export default function ClientesNuevoPage() {
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
            <h2 className="mb-0">Registrar Cliente</h2>
          </div>
        </div>
        {/*<!-- Formulario -->*/}
        <form className="container-form pe-4 ps-4">
          <div className="row">
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
          <div className="row">
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
          <p className="form-label">Dirección</p>
          <div className="row">
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
          <div className="row">
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
          <div className="d-flex justify-content-end pb-2 pt-2 ">
            <a href="#" className="btn btn-cancel me-2">
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
