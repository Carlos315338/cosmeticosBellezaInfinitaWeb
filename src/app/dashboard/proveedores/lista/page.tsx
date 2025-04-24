"use client";

import { useEffect, useState } from "react";
import CurrentTime from "@/app/ui/CurrentTime";
import { ProveedorDTO } from "@/services/productos/productoTypes";
import { productoService } from "@/services/productos/productoServices";

export default function ProveedoresListaPage() {
    const [data, setData] = useState<ProveedorDTO[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        cargarProveedores();
    }, [page]);

    const cargarProveedores = async () => {
        const res = await productoService.obtenerProveedores(page, 5);
        setData(res.content);
        setTotalPages(res.totalPages);
    };

    const handleEliminarProveedor = async (id: string) => {
        console.log("Click");
        const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar este Proveedor?");
        if (!confirmacion) return;

        try {
            await productoService.eliminacionProveedor(id);
            alert("Proveedor eliminado exitosamente.");
            cargarProveedores();
        } catch (error: any) {
            console.error("Error al eliminar proveedor:", error);
            alert(error.message || "No se pudo eliminar el Proveedor");
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

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex justify-content-end">
                    <div className="col-8 text-start">
                        <h1 className="tittle">Lista de Proveedores</h1>
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
                    <div className="col-sm-8 col-md-6 d-flex align-items-center"></div>
                    <div className="col-sm-4 col-md-6 d-flex align-items-center justify-content-end">
                        <input
                            type="text"
                            className="form-control w-50 mb-0"
                            placeholder="Buscar"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead className="table-light text-center">
                                <tr>
                                    <th>Acción</th>
                                    <th>NIT Proveedor</th>
                                    <th>Nombre Proveedor</th>
                                    <th>Correo Electrónico</th>
                                    <th>Teléfono</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((proveedor) => (
                                    <tr key={proveedor.idProveedor}>
                                        <td className="text-center">
                                            <button className="btn btn-sm btn-outline-primary me-1">✏️</button>
                                            <button onClick={() => handleEliminarProveedor(proveedor.idProveedor)} className="btn btn-sm btn-outline-danger">🗑️</button>
                                        </td>
                                        <td>{proveedor.nitProveedor}</td>
                                        <td>{proveedor.nombreProveedor}</td>
                                        <td>{proveedor.correoElectronico}</td>
                                        <td>{proveedor.telefono}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="row">
                    <div className="col-auto col-sm-12 col-md-6 col-xl-8 align-content-center">
                        <button className="btn btn-submit">Agregar Proveedores</button>
                    </div>

                    <div className="col-auto col-sm-12 col-md-6 col-xl-4 align-content-center text-center">
                        <nav aria-label="...">
                            <ul className="pagination mb-0">
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
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div >
    );
}

