"use client";

import CurrentTime from "@/app/ui/CurrentTime";

export default function ClientesListaPage() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <div className="col-8">
            <h1 className="tittle">Lista de Clientes</h1>
          </div>
          <CurrentTime />
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
                <th>Identificación</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Correo</th>
                <th>Teléfono</th>
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
                  <td>12345678{index}</td>
                  <td>Nombre Cliente {index + 1}</td>
                  <td>Dirección {index + 1}</td>
                  <td>cliente{index + 1}@correo.com</td>
                  <td>32000000{index}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-auto col-sm-12 col-md-6 col-xl-8 align-content-center">
            <button className="btn btn-submit">Agregar Cliente</button>
          </div>

          <div className="col-auto col-sm-12 col-md-6 col-xl-4 align-content-center text-center">
            <nav aria-label="...">
              <ul className="pagination">
                <li className="page-item disabled">
                  <span className="page-link">Anteriores</span>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item active" aria-current="page">
                  <span className="page-link">2</span>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Siguiente
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
