"use client";

import { useEffect, useState } from "react";
import CurrentTime from "@/app/ui/CurrentTime";
import { productoService } from "@/services/productos/productoServices";
import { ProductoDTO } from "@/services/productos/productoTypes";

export default function ProductosListaPage() {

    const [productos, setProductos] = useState<ProductoDTO[]>([]);
    const [totalPages, setTotalPages] = useState(1);

    const [page, setPage] = useState(0);

    useEffect(() => {
        cargarProductos(page);
    }, [page]);

    const cargarProductos = async (page: number) => {
        const res = await productoService.obtenerProductos(page, 5, "idProducto");
        setProductos(res.content);
        setTotalPages(res.totalPages);
    };

    const handleEliminarProducto = async (id: string) => {
        console.log("Click");
        const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar este producto?");
        if (!confirmacion) return;

        try {
            await productoService.eliminacionProducto(id);
            alert("Producto eliminado exitosamente.");
            cargarProductos(page); 
        } catch (error: any) {
            console.error("Error al eliminar producto:", error);
            alert(error.message || "No se pudo eliminar el producto");
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
                        <h1 className="tittle">Lista de Productos</h1>
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
                            {productos.map((producto) => (
                                <tr key={producto.idProducto}>
                                    <td className="text-center">
                                        <button className="btn btn-sm btn-outline-primary me-1">✏️</button>
                                        <button onClick={() => handleEliminarProducto(producto.idProducto)} className="btn btn-sm btn-outline-danger">🗑️</button>
                                    </td>
                                    <td>{producto.codigoDeBarras}</td>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.descripcion}</td>
                                    <td>$ {producto.precio}</td>
                                    <td>{producto.stock}</td>
                                    <td>{producto.categoria.nombreCategoria}</td>
                                    <td>{producto.proveedor.nombreProveedor}</td>
                                </tr>
                            ))}
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
        </div >
    );
}
