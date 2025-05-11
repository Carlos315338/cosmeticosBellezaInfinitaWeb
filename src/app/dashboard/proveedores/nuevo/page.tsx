"use client";
import CurrentTime from "@/app/ui/CurrentTime";
import Image from "next/image";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/bootstrap.css';
import { productoService } from "@/services/productos/productoServices";
import { ProveedorDTO } from "@/services/productos/productoTypes";

export default function ProveedoresNuevoPage() {
    const [form, setForm] = useState({
        nitProveedor: "",
        nombreProveedor: "",
        correoElectronico: "",
    });

    const [telefono, setTelefono] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [nitExiste, setNitExiste] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const isEmailValid = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isNumeric = (value: string) =>
        /^[0-9]+$/.test(value);

    const inputClass = (field: string, validator?: () => boolean) => {
        const value = form[field as keyof typeof form];
        if (!submitted) return "form-control";
        if (!value || (validator && !validator())) return "form-control is-invalid";
        return "form-control";
    };

    const errorMessage = (field: string, validator?: () => boolean) => {
        const value = form[field as keyof typeof form];
        if (!value) return "Este campo es obligatorio";
        if (validator && !validator()) return "Formato inválido";
        return null;
    };

    const telefonoClass = () => {
        if (!submitted) return "form-control";
        if (!telefono) return "form-control is-invalid";
        return "form-control";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        const allFilled = Object.values(form).every(v => v.trim() !== "") && telefono.trim() !== "";
        const emailValid = isEmailValid(form.correoElectronico);
        const nitValid = isNumeric(form.nitProveedor);
        const telValid = isNumeric(telefono.replace(/\D/g, ""));

        console.log("Existe :", nitExiste);

        if (nitExiste) {
            alert("No se puede guardar: el NIT ya está registrado.");
            return;
        }

        if (allFilled && emailValid && nitValid && telValid) {

            try {
                const proveedor: ProveedorDTO = {
                    idProveedor: "",
                    nitProveedor: form.nitProveedor,
                    nombreProveedor: form.nombreProveedor,
                    correoElectronico: form.correoElectronico,
                    telefono: telefono,
                };

                const mensaje = await productoService.guardarProveedor(proveedor);
                alert(mensaje);
                setForm({
                    nitProveedor: "",
                    nombreProveedor: "",
                    correoElectronico: "",
                });
                setTelefono("");
                setSubmitted(false);
            } catch (error) {
                console.error("Error al guardar proveedor", error);
                alert("Hubo un error al guardar el proveedor.");
            }
        }
    };

    const verificarNitExistente = async () => {
        if (form.nitProveedor.trim() === "") return;

        try {
            const res = await productoService.verificarNit(form.nitProveedor);
            setNitExiste(res); // true si ya existe
        } catch (error) {
            console.error("Error verificando NIT", error);
            setNitExiste(false);
        }
    };


    return (
        <div className="container p-2">
            <div className="row">
                <div className="col-12 d-flex justify-content-end">
                    <CurrentTime />
                </div>
            </div>
            <div className="container pb-3 register-customer">
                <div className="row align-items-center text-white rounded mb-3 px-3 py-2 header-customer">
                    <div className="col-md-6 d-flex align-items-center">
                        <Image
                            src="/more.png"
                            className="img-fluid me-2 img-menu-burger "
                            alt="Logo"
                            width={30}
                            height={30}
                        />
                        <h2 className="mb-0">Registrar Proveedores</h2>
                    </div>
                </div>
                <form className="row container-form me-2 ms-2" onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label className="form-label">NIT</label>
                            <input
                                type="text"
                                name="nitProveedor"
                                value={form.nitProveedor}
                                onChange={handleChange}
                                onBlur={verificarNitExistente}
                                className={inputClass("nitProveedor", () => isNumeric(form.nitProveedor) && !nitExiste)}
                                placeholder="Ingrese el NIT"
                            />
                            {submitted && (
                                <div className="invalid-feedback">
                                    {!form.nitProveedor
                                        ? "Este campo es obligatorio"
                                        : !isNumeric(form.nitProveedor)
                                            ? "Debe ser un número"
                                            : nitExiste
                                                ? "El NIT ya está registrado"
                                                : null}
                                </div>
                            )}

                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Nombre</label>
                            <input
                                type="text"
                                name="nombreProveedor"
                                value={form.nombreProveedor}
                                onChange={handleChange}
                                className={inputClass("nombreProveedor")}
                                placeholder="Ingrese el nombre"
                            />
                            {submitted && errorMessage("nombreProveedor") && (
                                <div className="invalid-feedback">
                                    {errorMessage("nombreProveedor")}
                                </div>
                            )}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Correo electrónico</label>
                            <input
                                type="email"
                                name="correoElectronico"
                                value={form.correoElectronico}
                                onChange={handleChange}
                                className={inputClass("correoElectronico", () => isEmailValid(form.correoElectronico))}
                                placeholder="Ingrese el correo"
                            />
                            {submitted && errorMessage("correoElectronico", () => isEmailValid(form.correoElectronico)) && (
                                <div className="invalid-feedback">
                                    {errorMessage("correoElectronico", () => isEmailValid(form.correoElectronico))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label className="form-label">Teléfono</label>
                            <PhoneInput
                                country={'co'}
                                value={telefono}
                                onChange={setTelefono}
                                inputClass={telefonoClass()}
                                inputStyle={{ width: "100%" }}
                            />
                            {submitted && !telefono && (
                                <div className="invalid-feedback d-block">
                                    Este campo es obligatorio
                                </div>
                            )}
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
