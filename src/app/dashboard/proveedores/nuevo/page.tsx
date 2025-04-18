"use client";
import Image from "next/image";

export default function ProveedoresNuevoPage() {
  return (
    <div className="container p-2">
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
            <h2 className="mb-0">Registrar Proveedores</h2>
          </div>
        </div>
        <form className="row container-form ms-2 me-2 pb-5">
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">
                Número de identificación tributaria (NIT)
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese el NIT del proveedor"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Nombre del proveedor</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese el nombre del proveedor"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">
                Correo electrónico del proveedor
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Ingrese el correo electrónico"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Teléfono del proveedor</label>
              <input
                type="tel"
                className="form-control"
                placeholder="Ingrese el teléfono"
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
