"use client";

import { useEffect, useState } from "react";
import CurrentTime from "@/app/ui/CurrentTime";
import { productoService } from "@/services/productos/productoServices";
import { CategoriaSelectDTO, ProductoDTO, ProductoUpdateDTO, ProveedorSelectDTO } from "@/services/productos/productoTypes";

export default function ProductosListaPage() {
    const [productos, setProductos] = useState<ProductoDTO[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(0);
    const [sortField, setSortField] = useState<string>("idProducto");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [nombreFiltro, setNombreFiltro] = useState<string>("");
    const [editandoId, setEditandoId] = useState<string | null>(null);
    const [productoEditado, setProductoEditado] = useState<ProductoUpdateDTO>({
        idProducto: "",
        codigoDeBarras: "",
        nombre: "",
        descripcion: "",
        precio: 0,
        stock: 0,
        categoriaId: "",
        proveedorId: "",
    });
    const [proveedores, setProveedores] = useState<ProveedorSelectDTO[]>([]);
    const [categorias, setCategorias] = useState<CategoriaSelectDTO[]>([]);
    const [loading, setLoading] = useState(false);

    const camposOrdenables: Record<string, string> = {
        codigo: "codigoDeBarras",
        producto: "nombre",
        descripcion: "descripcion",
        precio: "precio",
        stock: "stock",
        categoria: "categoria.nombreCategoria",
        proveedor: "proveedor.nombreProveedor",
    };

    useEffect(() => {
        cargarProductos(page, sortField, sortOrder, nombreFiltro);
    }, [page, sortField, sortOrder, nombreFiltro]);

    useEffect(() => {
        productoService.obtenerProveedorListaSelect().then(setProveedores);
        productoService.obtenerCategoriaListaSelect().then(setCategorias);
    }, []);

    const cargarProductos = async (page: number, sortField: string, sortOrder: "asc" | "desc", nombre: string) => {
        setLoading(true);
        try {

            const res = await productoService.obtenerProductos(page, 5, sortField, sortOrder, nombre.trim());
            setProductos(res.content);
            setTotalPages(res.totalPages);
        } catch (error) {
            console.error("Error al cargar productos:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEliminarProducto = async (id: string) => {
        const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar este producto?");
        if (!confirmacion) return;

        try {
            await productoService.eliminacionProducto(id);
            alert("Producto eliminado exitosamente.");
            cargarProductos(page, sortField, sortOrder, nombreFiltro);
        } catch (error: any) {
            alert(error.message || "No se pudo eliminar el producto");
        }
    };

    const handleGuardarEdicion = async () => {
        if (!editandoId) return;
        try {
            await productoService.actualizacionProducto(editandoId, productoEditado);
            setEditandoId(null);
            setProductoEditado({
                idProducto: "",
                codigoDeBarras: "",
                nombre: "",
                descripcion: "",
                precio: 0,
                stock: 0,
                categoriaId: "",
                proveedorId: "",
            });
            cargarProductos(page, sortField, sortOrder, nombreFiltro);
        } catch (error: any) {
            alert(error.message || "Error al actualizar el producto");
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

    const toggleSort = (campoVisual: keyof typeof camposOrdenables) => {
        const campoReal = camposOrdenables[campoVisual];
        if (sortField === campoReal) {
            setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortField(campoReal);
            setSortOrder("asc");
        }
        setPage(0);
    };

    const renderSortIcon = (campoVisual: keyof typeof camposOrdenables) => {
        const campoReal = camposOrdenables[campoVisual];
        if (sortField !== campoReal) return "⇅";
        return sortOrder === "asc" ? "⬆️" : "⬇️";
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex justify-content-end">
                    <div className="col-8 text-start">
                        <h1 className="tittle">Lista de Productos</h1>
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

                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-light text-center">
                            <tr>
                                <th>Acción</th>
                                <th onClick={() => toggleSort("codigo")} style={{ cursor: "pointer" }}>Código {renderSortIcon("codigo")}</th>
                                <th onClick={() => toggleSort("producto")} style={{ cursor: "pointer" }}>Producto {renderSortIcon("producto")}</th>
                                <th onClick={() => toggleSort("descripcion")} style={{ cursor: "pointer" }}>Descripción {renderSortIcon("descripcion")}</th>
                                <th onClick={() => toggleSort("precio")} style={{ cursor: "pointer" }}>Precio {renderSortIcon("precio")}</th>
                                <th onClick={() => toggleSort("stock")} style={{ cursor: "pointer" }}>Stock {renderSortIcon("stock")}</th>
                                <th onClick={() => toggleSort("categoria")} style={{ cursor: "pointer" }}>Categoría {renderSortIcon("categoria")}</th>
                                <th onClick={() => toggleSort("proveedor")} style={{ cursor: "pointer" }}>Proveedor {renderSortIcon("proveedor")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-4">
                                        <div className="spinner-border" style={{ color: "#5c0061" }} role="status">
                                            <span className="visually-hidden">Cargando...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (productos.map((producto) => (
                                <tr key={producto.idProducto}>
                                    <td className="text-center">
                                        {editandoId === producto.idProducto ? (
                                            <>
                                                <button onClick={handleGuardarEdicion} className="btn btn-sm btn-success me-1">💾</button>
                                                <button onClick={() => setEditandoId(null)} className="btn btn-sm btn-secondary">❌</button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => {
                                                        setEditandoId(producto.idProducto);
                                                        setProductoEditado({
                                                            idProducto: producto.idProducto,
                                                            codigoDeBarras: producto.codigoDeBarras,
                                                            nombre: producto.nombre,
                                                            descripcion: producto.descripcion,
                                                            precio: producto.precio,
                                                            stock: producto.stock,
                                                            categoriaId: producto.categoria.idCategoria,
                                                            proveedorId: producto.proveedor.idProveedor,
                                                        });
                                                    }}
                                                    className="btn btn-sm btn-outline-primary me-1"
                                                >✏️</button>
                                                <button
                                                    onClick={() => handleEliminarProducto(producto.idProducto)}
                                                    className="btn btn-sm btn-outline-danger"
                                                >🗑️</button>
                                            </>
                                        )}
                                    </td>
                                    <td>{editandoId === producto.idProducto ? <input className="form-control" value={productoEditado.codigoDeBarras} onChange={(e) => setProductoEditado({ ...productoEditado, codigoDeBarras: e.target.value })} /> : producto.codigoDeBarras}</td>
                                    <td>{editandoId === producto.idProducto ? <input className="form-control" value={productoEditado.nombre} onChange={(e) => setProductoEditado({ ...productoEditado, nombre: e.target.value })} /> : producto.nombre}</td>
                                    <td>{editandoId === producto.idProducto ? <input className="form-control" value={productoEditado.descripcion} onChange={(e) => setProductoEditado({ ...productoEditado, descripcion: e.target.value })} /> : producto.descripcion}</td>
                                    <td>{editandoId === producto.idProducto ? (<input type="number" className="form-control" value={productoEditado.precio} onChange={(e) => setProductoEditado({ ...productoEditado, precio: parseFloat(e.target.value), })} />) : (`$ ${new Intl.NumberFormat('es-CO').format(producto.precio)}`)} </td>
                                    <td>{editandoId === producto.idProducto ? (<input type="number" className="form-control" value={productoEditado.stock} onChange={(e) => setProductoEditado({ ...productoEditado, stock: parseInt(e.target.value), })} />) : (new Intl.NumberFormat('es-CO').format(producto.stock))} </td>
                                    <td>{editandoId === producto.idProducto ? (
                                        <select className="form-control" value={productoEditado.categoriaId} onChange={(e) => setProductoEditado({ ...productoEditado, categoriaId: e.target.value })}>
                                            <option value="">Seleccione una categoría</option>
                                            {categorias.map(c => (
                                                <option key={c.idCategoria} value={c.idCategoria}>{c.nombreCategoria}</option>
                                            ))}
                                        </select>
                                    ) : producto.categoria.nombreCategoria}</td>
                                    <td>{editandoId === producto.idProducto ? (
                                        <select className="form-control" value={productoEditado.proveedorId} onChange={(e) => setProductoEditado({ ...productoEditado, proveedorId: e.target.value })}>
                                            <option value="">Seleccione un proveedor</option>
                                            {proveedores.map(p => (
                                                <option key={p.idProveedor} value={p.idProveedor}>{p.nombreProveedor}</option>
                                            ))}
                                        </select>
                                    ) : producto.proveedor.nombreProveedor}</td>
                                </tr>
                            )))}
                        </tbody>
                    </table>
                </div>

                <div className="row">
                    <div className="col-auto col-sm-12 col-md-6 col-xl-8 align-content-center">
                        <button className="btn btn-submit">Agregar Productos</button>
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
        </div>
    );
}

