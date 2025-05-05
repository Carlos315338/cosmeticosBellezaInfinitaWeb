"use client";

import CurrentTime from "@/app/ui/CurrentTime";
import { finanzaService } from "@/services/finanza/finanzaServices";
import { ClienteDTO } from "@/services/finanza/finanzaType";
import { useEffect, useState } from "react";

export default function ClientesListaPage() {
    const [clientes, setClientes] = useState<ClienteDTO[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [nombreFiltro, setNombreFiltro] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [sortField, setSortField] = useState<string>("nombreCompleto");
    const [editandoId, setEditandoId] = useState<string | null>(null);
    const [clienteEditado, setClienteEditado] = useState<ClienteDTO>({
        id: "", identificacion: "", primerNombre: "", segundoNombre: "",
        primerApellido: "", segundoApellido: "", correoElectronico: "", telefono: ""
    });

    useEffect(() => {
        cargarClientes(page, nombreFiltro.trim(), sortField, sortOrder);
    }, [page, nombreFiltro, sortField, sortOrder]);

    const cargarClientes = async (page: number, nombre: string, campo: string, orden: "asc" | "desc") => {
        setLoading(true);
        try {
            const res = await finanzaService.obtenerClientes(page, 5, campo, orden, nombre);
            setClientes(res.content);
            setTotalPages(res.totalPages);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleEliminarCliente = async (id: string) => {
        const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar este cliente?");
        if (!confirmacion) return;

        try {
            await finanzaService.eliminacionCliente(id);
            alert("Cliente eliminado exitosamente.");
            cargarClientes(page, nombreFiltro, sortField, sortOrder);
        } catch (error: any) {
            alert(error.message || "No se pudo eliminar el cliente");
        }
    };

    const handleGuardarEdicion = async () => {
        if (!editandoId) return;
        try {
            await finanzaService.actualizacionCliente(editandoId, clienteEditado);
            setEditandoId(null);
            cargarClientes(page, nombreFiltro, sortField, sortOrder);
        } catch (error: any) {
            alert(error.message || "Error al actualizar el cliente");
        }
    };

    const getPageNumbers = () => {
        const maxVisible = 4;
        const half = Math.floor(maxVisible / 2);
        let start = Math.max(0, page - half);
        let end = Math.min(totalPages, start + maxVisible);
        if (end - start < maxVisible) start = Math.max(0, end - maxVisible);
        return Array.from({ length: end - start }, (_, i) => start + i);
    };

    const toggleSort = (campo: string) => {
        if (sortField === campo) {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortField(campo);
            setSortOrder("asc");
        }
        setPage(0);
    };

    const nombreCompleto = (c: ClienteDTO) =>
        `${c.primerNombre} ${c.segundoNombre || ""} ${c.primerApellido} ${c.segundoApellido || ""}`.trim();

    const renderSortIcon = (campo: string) => {
        if (sortField !== campo) return "⇅";
        return sortOrder === "asc" ? "⬆️" : "⬇️";
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
                <div className="row align-items-center text-white rounded mb-3 px-3 py-2 header-customer">
                    <div className="col-sm-8 col-md-6"></div>
                    <div className="col-sm-4 col-md-6 d-flex justify-content-end">
                        <input
                            type="text"
                            className="form-control w-50"
                            placeholder="Buscar por nombre"
                            value={nombreFiltro}
                            onChange={(e) => {
                                setPage(0);
                                setNombreFiltro(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-light text-center">
                            <tr>
                                <th>Acción</th>
                                <th style={{ cursor: "pointer" }} onClick={() => toggleSort("identificacion")}>
                                    Identificación {renderSortIcon("identificacion")}
                                </th>
                                <th style={{ cursor: "pointer" }} onClick={() => toggleSort("nombreCompleto")}>
                                    Nombre Completo {renderSortIcon("nombreCompleto")}
                                </th>
                                {/** <th>Dirección</th> */}
                                <th style={{ cursor: "pointer" }} onClick={() => toggleSort("correoElectronico")}>
                                    Correo {renderSortIcon("correoElectronico")}
                                </th>
                                <th style={{ cursor: "pointer" }} onClick={() => toggleSort("telefono")}>
                                    Teléfono {renderSortIcon("telefono")}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={5} className="text-center py-4">
                                    <div className="spinner-border" style={{ color: "#5c0061" }} role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </div>
                                </td></tr>
                            ) : clientes.length === 0 ? (
                                <tr><td colSpan={5} className="text-center">No hay clientes disponibles.</td></tr>
                            ) : (
                                clientes.map(cliente => (
                                    <tr key={cliente.id}>
                                        <td className="text-center">
                                            {editandoId === cliente.id ? (
                                                <>
                                                    <button onClick={handleGuardarEdicion} className="btn btn-sm btn-success me-1">💾</button>
                                                    <button onClick={() => setEditandoId(null)} className="btn btn-sm btn-secondary">❌</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className="btn btn-sm btn-outline-primary me-1" onClick={() => {
                                                        setEditandoId(cliente.id);
                                                        setClienteEditado(cliente);
                                                    }}>✏️</button>
                                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminarCliente(cliente.id)}>🗑️</button>
                                                </>
                                            )}
                                        </td>
                                        <td>{editandoId === cliente.id ? <input className="form-control" value={clienteEditado.identificacion} onChange={(e) => setClienteEditado({ ...clienteEditado, identificacion: e.target.value })} /> : cliente.identificacion}</td>
                                        <td>{editandoId === cliente.id ? (
                                            <div className="d-flex flex-column gap-1">
                                                <input className="form-control" placeholder="Primer nombre" value={clienteEditado.primerNombre} onChange={(e) => setClienteEditado({ ...clienteEditado, primerNombre: e.target.value })} />
                                                <input className="form-control" placeholder="Segundo nombre" value={clienteEditado.segundoNombre} onChange={(e) => setClienteEditado({ ...clienteEditado, segundoNombre: e.target.value })} />
                                                <input className="form-control" placeholder="Primer apellido" value={clienteEditado.primerApellido} onChange={(e) => setClienteEditado({ ...clienteEditado, primerApellido: e.target.value })} />
                                                <input className="form-control" placeholder="Segundo apellido" value={clienteEditado.segundoApellido} onChange={(e) => setClienteEditado({ ...clienteEditado, segundoApellido: e.target.value })} />
                                            </div>
                                        ) : nombreCompleto(cliente)}</td>
                                        <td>{editandoId === cliente.id ? <input className="form-control" value={clienteEditado.correoElectronico} onChange={(e) => setClienteEditado({ ...clienteEditado, correoElectronico: e.target.value })} /> : cliente.correoElectronico}</td>
                                        <td>{editandoId === cliente.id ? <input className="form-control" value={clienteEditado.telefono} onChange={(e) => setClienteEditado({ ...clienteEditado, telefono: e.target.value })} /> : cliente.telefono}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="row">
                    <div className="col-auto col-sm-12 col-md-6 col-xl-8">
                        <button className="btn btn-submit">Agregar Cliente</button>
                    </div>
                    <div className="col-auto col-sm-12 col-md-6 col-xl-4 text-center">
                        <nav>
                            <ul className="pagination">
                                <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={() => setPage(p => Math.max(p - 1, 0))}>Anterior</button>
                                </li>
                                {getPageNumbers().map(i => (
                                    <li key={i} className={`page-item ${i === page ? "active" : ""}`}>
                                        <button className="page-link" onClick={() => setPage(i)}>{i + 1}</button>
                                    </li>
                                ))}
                                <li className={`page-item ${page + 1 >= totalPages ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))}>Siguiente</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

