"use client";
import CurrentTime from "@/app/ui/CurrentTime";
import { productoService } from "@/services/productos/productoServices";
import { CategoriaSelectDTO, ProveedorSelectDTO } from "@/services/productos/productoTypes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductosNuevoPage() {
    const [proveedores, setProveedores] = useState<ProveedorSelectDTO[]>([]);
    const [categorias, setCategorias] = useState<CategoriaSelectDTO[]>([]);
    const [form, setForm] = useState({
        codigoDeBarras: "",
        nombre: "",
        descripcion: "",
        categoriaId: "",
        precio: "",
        porcentaje: "",
        precioVenta: "",
        proveedorId: "",
        stock: "",
    });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        cargarProveedores();
        cargarCategorias();
    }, []);

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
            console.error("Error cargando categorías", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleNumericKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/[0-9.]/.test(e.key)) {
            e.preventDefault();
        }
    };

    const isNumeric = (value: string) => !isNaN(parseFloat(value)) && isFinite(Number(value));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        const requiredFieldsFilled = Object.values(form).every(val => val.trim() !== "");
        const numericFieldsValid =
            isNumeric(form.precio) &&
            isNumeric(form.porcentaje) &&
            isNumeric(form.precioVenta) &&
            isNumeric(form.stock);

        if (requiredFieldsFilled && numericFieldsValid) {
            try {
                const producto = {
                    idProducto: "", // si es creación, va vacío
                    codigoDeBarras: form.codigoDeBarras,
                    nombre: form.nombre,
                    descripcion: form.descripcion,
                    precio: parseFloat(form.precio),
                    stock: parseInt(form.stock),
                    categoriaId: form.categoriaId,
                    proveedorId: form.proveedorId,
                };

                const mensaje = await productoService.guardarProducto(producto);
                alert(mensaje); // aquí puedes cambiar por un modal o animación
            } catch (error) {
                console.error("Error al guardar producto", error);
                alert("Hubo un error al guardar el producto.");
            }
        }
    };

    const inputClass = (field: string, isNumber: boolean = false) => {
        const value = form[field as keyof typeof form];
        if (!submitted) return "form-control";
        if (!value) return "form-control is-invalid";
        if (isNumber && !isNumeric(value)) return "form-control is-invalid";
        return "form-control";
    };

    const selectClass = (field: string) =>
        submitted && !form[field as keyof typeof form] ? "form-select is-invalid" : "form-select";

    const errorMessage = (field: string, isNumber: boolean = false) => {
        const value = form[field as keyof typeof form];
        if (!value) return "Este campo es obligatorio";
        if (isNumber && !isNumeric(value)) return "Debe ser un número válido";
        return null;
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex justify-content-end">
                    <CurrentTime />
                </div>
            </div>
            <div className="container pb-3 register-customer">
                <div className="row align-items-center text-white rounded mb-3 px-3 py-2 header-customer">
                    <div className="col-md-6 d-flex align-items-center">
                        <Image src="/more.png" className="img-fluid me-2 img-menu-burger" alt="Logo" width={30} height={30} />
                        <h2 className="mb-0">Registrar Productos</h2>
                    </div>
                </div>
                <form className="row container-form ms-2 me-2 pb-5" onSubmit={handleSubmit}>
                    {/* Campos del formulario adaptados a los nombres del DTO */}
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label className="form-label">Código de barras</label>
                            <input type="text" className={inputClass("codigoDeBarras")} name="codigoDeBarras" value={form.codigoDeBarras} onChange={handleChange} />
                            {submitted && errorMessage("codigoDeBarras") && <div className="invalid-feedback">{errorMessage("codigoDeBarras")}</div>}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Nombre del producto</label>
                            <input type="text" className={inputClass("nombre")} name="nombre" value={form.nombre} onChange={handleChange} />
                            {submitted && errorMessage("nombre") && <div className="invalid-feedback">{errorMessage("nombre")}</div>}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Descripción</label>
                            <input type="text" className={inputClass("descripcion")} name="descripcion" value={form.descripcion} onChange={handleChange} />
                            {submitted && errorMessage("descripcion") && <div className="invalid-feedback">{errorMessage("descripcion")}</div>}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label className="form-label">Categoría</label>
                            <select className={selectClass("categoriaId")} name="categoriaId" value={form.categoriaId} onChange={handleChange}>
                                <option value="">Seleccione una categoría</option>
                                {categorias.map((cat) => (
                                    <option key={cat.idCategoria} value={cat.idCategoria}>{cat.nombreCategoria}</option>
                                ))}
                            </select>
                            {submitted && errorMessage("categoriaId") && <div className="invalid-feedback">{errorMessage("categoriaId")}</div>}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Precio de compra</label>
                            <input type="text" className={inputClass("precio", true)} name="precio" value={form.precio} onChange={handleChange} onKeyPress={handleNumericKeyPress} />
                            {submitted && errorMessage("precio", true) && <div className="invalid-feedback">{errorMessage("precio", true)}</div>}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Porcentaje</label>
                            <input type="text" className={inputClass("porcentaje", true)} name="porcentaje" value={form.porcentaje} onChange={handleChange} onKeyPress={handleNumericKeyPress} />
                            {submitted && errorMessage("porcentaje", true) && <div className="invalid-feedback">{errorMessage("porcentaje", true)}</div>}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label className="form-label">Precio de venta</label>
                            <input type="text" className={inputClass("precioVenta", true)} name="precioVenta" value={form.precioVenta} onChange={handleChange} onKeyPress={handleNumericKeyPress} />
                            {submitted && errorMessage("precioVenta", true) && <div className="invalid-feedback">{errorMessage("precioVenta", true)}</div>}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Proveedor</label>
                            <select className={selectClass("proveedorId")} name="proveedorId" value={form.proveedorId} onChange={handleChange}>
                                <option value="">Seleccione un proveedor</option>
                                {proveedores.map((prov) => (
                                    <option key={prov.idProveedor} value={prov.idProveedor}>{prov.nombreProveedor}</option>
                                ))}
                            </select>
                            {submitted && errorMessage("proveedorId") && <div className="invalid-feedback">{errorMessage("proveedorId")}</div>}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Stock</label>
                            <input type="text" className={inputClass("stock", true)} name="stock" value={form.stock} onChange={handleChange} onKeyPress={handleNumericKeyPress} />
                            {submitted && errorMessage("stock", true) && <div className="invalid-feedback">{errorMessage("stock", true)}</div>}
                        </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <a href="#" className="btn btn-cancel">Cancelar</a>
                        <button type="submit" className="btn btn-submit">Guardar cambios</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

