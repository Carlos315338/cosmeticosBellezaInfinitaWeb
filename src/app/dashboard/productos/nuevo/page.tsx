"use client";
import CurrentTime from "@/app/ui/CurrentTime";
import Image from "next/image";

export default function ProductosNuevoPage() {
  return (
    <div className="container">
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
            <h2 className="mb-0">Registrar Productos</h2>
          </div>
        </div>
        <form className="row container-form ms-2 me-2 pb-5">
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Código</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Producto</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Descripción</label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Categoría</label>
              <select className="form-select">
                <option value="">Seleccione una Categoría</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Precio de compra</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
              <div className="form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  id="porcentaje-aplicable"
                />
                <label
                  className="form-check-label text-black"
                  htmlFor="porcentaje-aplicable"
                >
                  Porcentaje aplicable
                </label>
              </div>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Porcentaje"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Precio de venta</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Proveedor</label>
              <select className="form-select">
                <option value="">Seleccione un Proveedor</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Stock</label>
              <input type="text" className="form-control" />
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
