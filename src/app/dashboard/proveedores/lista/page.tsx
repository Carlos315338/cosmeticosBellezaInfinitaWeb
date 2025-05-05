"use client";

import { useEffect, useState } from "react";
import CurrentTime from "@/app/ui/CurrentTime";
import { ProveedorDTO } from "@/services/productos/productoTypes";
import { productoService } from "@/services/productos/productoServices";

export default function ProveedoresListaPage() {
    const [data, setData] = useState<ProveedorDTO[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [sortField, setSortField] = useState<string>("nombreProveedor");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [nombreFiltro, setNombreFiltro] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [editandoId, setEditandoId] = useState<string | null>(null);
    const [formEdit, setFormEdit] = useState<ProveedorDTO>({
        idProveedor: "",
        nitProveedor: "",
        nombreProveedor: "",
        correoElectronico: "",
        telefono: "",
    });

    useEffect(() => {
        cargarProveedores();
    }, [page, sortField, sortOrder, nombreFiltro]);

    const cargarProveedores = async () => {
        setLoading(true);
        try {
            const res = await productoService.obtenerProveedores(
                page,
                5,
                sortField,
                sortOrder,
                nombreFiltro.trim()
            );
            setData(res.content);
            setTotalPages(res.totalPages);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleEliminarProveedor = async (id: string) => {
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

    const toggleSort = (campo: string) => {
        if (sortField === campo) {
            setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortField(campo);
            setSortOrder("asc");
        }
        setPage(0);
    };

    const renderSortIcon = (campo: string) => {
        if (sortField !== campo) return "⇅";
        return sortOrder === "asc" ? "⬆️" : "⬇️";
    };

    const iniciarEdicion = (proveedor: ProveedorDTO) => {
        setEditandoId(proveedor.idProveedor);
        setFormEdit({ ...proveedor });
    };

    const cancelarEdicion = () => {
        setEditandoId(null);
    };

    const guardarCambios = async (id: string) => {
        try {
            await productoService.actualizarProveedor(id, formEdit);
            alert("Proveedor actualizado");
            setEditandoId(null);
            cargarProveedores();
        } catch (err: any) {
            alert(err.message || "Error al guardar cambios");
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

            <div className="rounded shadow-sm p-0 pe-3 ps-3 mb-4" style={{ background: "white" }}>
                <div className="row align-items-center text-white rounded mb-3 px-3 py-2 header-customer">
                    <div className="col-sm-8 col-md-6 d-flex align-items-center"></div>
                    <div className="col-sm-4 col-md-6 d-flex align-items-center justify-content-end">
                        <input
                            type="text"
                            className="form-control w-50 mb-0"
                            placeholder="Buscar por nombre"
                            value={nombreFiltro}
                            onChange={(e) => {
                                setPage(0);
                                setNombreFiltro(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead className="table-light text-center">
                                <tr>
                                    <th>Acción</th>
                                    <th onClick={() => toggleSort("nitProveedor")} style={{ cursor: "pointer" }}>
                                        NIT Proveedor {renderSortIcon("nitProveedor")}
                                    </th>
                                    <th onClick={() => toggleSort("nombreProveedor")} style={{ cursor: "pointer" }}>
                                        Nombre Proveedor {renderSortIcon("nombreProveedor")}
                                    </th>
                                    <th onClick={() => toggleSort("correoElectronico")} style={{ cursor: "pointer" }}>
                                        Correo Electrónico {renderSortIcon("correoElectronico")}
                                    </th>
                                    <th onClick={() => toggleSort("telefono")} style={{ cursor: "pointer" }}>
                                        Teléfono {renderSortIcon("telefono")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-5">
                                            <div className="spinner-border spinner-border-lg" role="status" style={{ width: "3rem", height: "3rem", color: "#5c0061" }}>
                                                <span className="visually-hidden">Cargando...</span>
                                            </div>
                                            <p className="mt-2">Cargando proveedores...</p>
                                        </td>
                                    </tr>
                                ) : data.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center">No hay proveedores disponibles.</td>
                                    </tr>
                                ) : (
                                    data.map((proveedor) => (
                                        <tr key={proveedor.idProveedor}>
                                            <td className="text-center">
                                                {editandoId === proveedor.idProveedor ? (
                                                    <>
                                                        <button className="btn btn-sm btn-success me-1" onClick={() => guardarCambios(proveedor.idProveedor)}>💾</button>
                                                        <button className="btn btn-sm btn-secondary" onClick={cancelarEdicion}>❌</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button className="btn btn-sm btn-outline-primary me-1" onClick={() => iniciarEdicion(proveedor)}>✏️</button>
                                                        <button onClick={() => handleEliminarProveedor(proveedor.idProveedor)} className="btn btn-sm btn-outline-danger">🗑️</button>
                                                    </>
                                                )}
                                            </td>
                                            <td>
                                                {editandoId === proveedor.idProveedor ? (
                                                    <input value={formEdit.nitProveedor} onChange={e => setFormEdit(prev => ({ ...prev, nitProveedor: e.target.value }))} className="form-control" />
                                                ) : proveedor.nitProveedor}
                                            </td>
                                            <td>
                                                {editandoId === proveedor.idProveedor ? (
                                                    <input value={formEdit.nombreProveedor} onChange={e => setFormEdit(prev => ({ ...prev, nombreProveedor: e.target.value }))} className="form-control" />
                                                ) : proveedor.nombreProveedor}
                                            </td>
                                            <td>
                                                {editandoId === proveedor.idProveedor ? (
                                                    <input value={formEdit.correoElectronico} onChange={e => setFormEdit(prev => ({ ...prev, correoElectronico: e.target.value }))} className="form-control" />
                                                ) : proveedor.correoElectronico}
                                            </td>
                                            <td>
                                                {editandoId === proveedor.idProveedor ? (
                                                    <input value={formEdit.telefono} onChange={e => setFormEdit(prev => ({ ...prev, telefono: e.target.value }))} className="form-control" />
                                                ) : proveedor.telefono}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="row">
                    <div className="col-auto col-sm-12 col-md-6 col-xl-8 align-content-center">
                        <button className="btn btn-submit" disabled={loading}>Agregar Proveedores</button>
                    </div>

                    <div className="col-auto col-sm-12 col-md-6 col-xl-4 align-content-center text-center">
                        <nav aria-label="...">
                            <ul className="pagination mb-0">
                                <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={loading}>Anterior</button>
                                </li>
                                {getPageNumbers().map((i) => (
                                    <li key={i} className={`page-item ${page === i ? "active" : ""}`}>
                                        <button className="page-link" onClick={() => setPage(i)} disabled={loading}>{i + 1}</button>
                                    </li>
                                ))}
                                <li className={`page-item ${page + 1 === totalPages ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))} disabled={loading}>Siguiente</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

