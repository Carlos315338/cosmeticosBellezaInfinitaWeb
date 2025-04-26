"use client";

import CurrentTime from "@/app/ui/CurrentTime";
import { finanzaService } from "@/services/finanza/finanzaServices";
import { ClienteDTO } from "@/services/finanza/finanzaType";
import { useEffect, useState } from "react";

export default function ClientesListaPage() {

    const [clientes, setClientes] = useState<ClienteDTO[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(0);

    useEffect(() => {
        cargarClientes(page);
    }, [page]);

    const cargarClientes = async (page: number) => {
        const res = await finanzaService.obtenerClientes(page, 5);
        setClientes(res.content);
        setTotalPages(res.totalPages);
    };

    const handleEliminarCliente = async (id: string) => {
        const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar este cliente?");
        if (!confirmacion) return;

        try {
            await finanzaService.eliminacionCliente(id);
            alert("Cliente eliminado exitosamente.");
            cargarClientes(page);
        } catch (error: any) {
            console.error("Error al eliminar cliente:", error);
            alert(error.message || "No se pudo eliminar el cliente");
        }
    };

    const getPageNumbers = () => {
        const maxVisible = 4;
        const half = Math.floor(maxVisible / 2);
        let start = Math.max(0, page - half);
        let end = Math.min(totalPages, start + maxVisible);

        if (end - start < maxVisible) {
            start = Math.max(0, end - maxVisible);
        }

        return Array.from({ length: end - start }, (_, i) => start + i);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

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

            <div className="rounded shadow-sm p-0 pe-3 ps-3 mb-4" style={{ background: "white" }}>
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
                                <th>Nombre Completo</th>
                                <th>Dirección</th>
                                <th>Correo</th>
                                <th>Teléfono</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center">No hay clientes disponibles.</td>
                                </tr>
                            ) : (
                                clientes.map((cliente) => (
                                    <tr key={cliente.id}>
                                        <td className="text-center">
                                            <button
                                                className="btn btn-sm btn-outline-primary me-1"
                                                onClick={() => alert("Funcionalidad de edición aún no implementada")}
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleEliminarCliente(cliente.id)}
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                        <td>{cliente.identificacion}</td>
                                        <td>{`${cliente.primerNombre} ${cliente.segundoNombre} ${cliente.primerApellido} ${cliente.segundoApellido}`}</td>
                                        <td>Dirección no disponible</td>
                                        <td>{cliente.correoElectronico}</td>
                                        <td>{cliente.telefono}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>

                {/* Paginación */}
                <div className="row">
                    <div className="col-auto col-sm-12 col-md-6 col-xl-8 align-content-center">
                        <button className="btn btn-submit">Agregar Cliente</button>
                    </div>

                    <div className="col-auto col-sm-12 col-md-6 col-xl-4 align-content-center text-center">
                        <nav aria-label="Page navigation">
                            <ul className="pagination justify-content-center">

                                {/* Botón anterior */}
                                <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={() => handlePageChange(page - 1)}>
                                        Anterior
                                    </button>
                                </li>

                                {/* Números de página */}
                                {getPageNumbers().map((pageNum) => (
                                    <li
                                        key={pageNum}
                                        className={`page-item ${pageNum === page ? "active" : ""}`}
                                    >
                                        <button className="page-link" onClick={() => handlePageChange(pageNum)}>
                                            {pageNum + 1}
                                        </button>
                                    </li>
                                ))}

                                {/* Botón siguiente */}
                                <li className={`page-item ${page + 1 >= totalPages ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                                        Siguiente
                                    </button>
                                </li>

                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

