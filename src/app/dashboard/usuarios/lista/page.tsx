"use client";

import { useEffect, useState } from "react";
import CurrentTime from "@/app/ui/CurrentTime";
import { usuarioService } from "@/services/usuarios/usuarioService";
import { UsuarioDTO } from "@/services/usuarios/clienteTypes";

export default function UsuariosListaPage() {
  const [usuarios, setUsuarios] = useState<UsuarioDTO[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    obtenerUsuariosPaginado();
  }, [page]);

    const obtenerUsuariosPaginado = async () => {
      const res = await usuarioService.obtenerUsuarios(page, 5);
      setUsuarios(res.content);
      setTotalPages(res.totalPages);
    };

  const getPageNumbers = () => {
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(0, page - half);
    let end = Math.min(totalPages, start + maxVisible);
    if (end - start < maxVisible) start = Math.max(0, end - maxVisible);
    return Array.from({ length: end - start }, (_, i) => start + i);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <div className="col-8 text-start">
            <h1 className="tittle">Lista de Usuarios</h1>
          </div>
          <CurrentTime />
        </div>
      </div>

      <div className="rounded shadow-sm p-0 pe-3 ps-3 mb-4" style={{ background: "white" }}>
        <div className="row align-items-center text-white rounded mb-3 px-3 py-2 header-customer">
          <div className="col-sm-8 col-md-6 d-flex align-items-center"></div>
          <div className="col-sm-4 col-md-6 d-flex align-items-center justify-content-end">
            <input type="text" className="form-control w-50 mb-0" placeholder="Buscar" />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light text-center">
              <tr>
                <th>Acción</th>
                <th>Nombre</th>
                { /** <th>Apellido</th> **/}
                <th>Identificación</th>
                { /** <th>Correo Electrónico</th> **/}
                <th>Contraseña</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.idUsuario}>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-primary me-1">✏️</button>
                    <button className="btn btn-sm btn-outline-danger">🗑️</button>
                  </td>
                  <td>{usuario.nombreUsuario}</td>
                  { /** <td>{usuario.apellido}</td> **/}
                  <td>{usuario.idUsuario}</td>
                  { /** <td>{usuario.correo}</td> **/}
                  <td>•••••••</td>
                  <td>{usuario.rol.nombreRol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="row">
          <div className="col-auto col-sm-12 col-md-6 col-xl-8 align-content-center">
            <button className="btn btn-submit">Agregar Usuario</button>
          </div>

          <div className="col-auto col-sm-12 col-md-6 col-xl-4 align-content-center text-center">
            <nav aria-label="...">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setPage(0)}>«</button>
                </li>
                <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setPage((p) => Math.max(p - 1, 0))}>Anterior</button>
                </li>
                {getPageNumbers().map((i) => (
                  <li key={i} className={`page-item ${page === i ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setPage(i)}>{i + 1}</button>
                  </li>
                ))}
                <li className={`page-item ${page + 1 === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}>Siguiente</button>
                </li>
                <li className={`page-item ${page + 1 === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setPage(totalPages - 1)}>»</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

