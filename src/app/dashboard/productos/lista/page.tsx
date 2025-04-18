"use client";

import CurrentTime from "@/app/ui/CurrentTime";

export default function ProductosListaPage() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <CurrentTime />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-8 text-start">
          <h1 className="tittle pt-2 pb-2">Lista de Productos</h1>
        </div>
      </div>

      <div
        className="rounded shadow-sm p-0 pe-3 ps-3 mb-4"
        style={{ background: "white" }}
      >
        {/* Barra de búsqueda */}
        <div className="row align-items-center text-white rounded mb-3 px-3 py-2 header-customer">
          <div className="col-sm-8 col-md-6 d-flex align-items-center">
            {/* Puedes agregar un ícono o título aquí */}
          </div>
          <div className="col-sm-4 col-md-6 d-flex align-items-center justify-content-end">
            <input
              type="text"
              className="form-control w-50 mb-0"
              placeholder="Buscar"
            />
          </div>
        </div>

        {/* Tabla */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light text-center">
              <tr>
                <th>Acción</th>
                <th>Código</th>
                <th>Producto</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Proveedor</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-primary me-1">
                      ✏️
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      🗑️
                    </button>
                  </td>
                  <td>{1000 + index}</td>
                  <td>Producto {index + 1}</td>
                  <td>Descripción {index + 1}</td>
                  <td>$ {10000 + index * 500}</td>
                  <td>{20 + index}</td>
                  <td>Categoría {index + 1}</td>
                  <td>Proveedor {index + 1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
