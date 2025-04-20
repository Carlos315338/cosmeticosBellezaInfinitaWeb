"use client";
import CurrentTime from "@/app/ui/CurrentTime";
import { productoService } from "@/services/productos/productoServices";
import { CategoriaSelectDTO, ProveedorSelectDTO } from "@/services/productos/productoTypes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductosNuevoPage() {

  const [proveedores, setProveedores] = useState<ProveedorSelectDTO[]>([]);
  const [categorias, setCategorias] = useState<CategoriaSelectDTO[]>([]);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<string>("");
  const [categoriaSeleccionado, setCategoriaSeleccionado] = useState<string>("");

  useEffect(() => {
    const cargarProveedores = async () => {
      try {
        const res = await productoService.obtenerProveedorListaSelect();
        setProveedores(res);
      } catch (error) {
        console.error("Error cargando proveedores", error);
      }
    };

    const cargarCategorias = async () => {
      try {
        const res = await productoService.obtenerCategoriaListaSelect();
        setCategorias(res);
      } catch (error) {
        console.error("Error cargando proveedores", error);
      }
    };

    cargarProveedores();
    cargarCategorias();

  }, []);

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
              <select id="categoria" className="form-select" value={categoriaSeleccionado} onChange={(e) => setCategoriaSeleccionado(e.target.value)}>
                <option value="">Seleccione un Categoría</option>
                {categorias.map((prov) => (
                  <option key={prov.idCategoria} value={prov.idCategoria}>
                    {prov.nombreCategoria}
                  </option>
                ))}
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
              <select id="proveedor" className="form-select" value={proveedorSeleccionado} onChange={(e) => setProveedorSeleccionado(e.target.value)}>
                <option value="">Seleccione un proveedor</option>
                {proveedores.map((prov) => (
                  <option key={prov.idProveedor} value={prov.idProveedor}>
                    {prov.nombreProveedor}
                  </option>
                ))}
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
