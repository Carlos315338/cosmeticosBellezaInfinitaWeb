"use client";

import { useEffect, useState } from "react";
import CurrentTime from "@/app/ui/CurrentTime";
import Image from "next/image";
import { crearUsuario, rolSelectDTO } from "@/services/usuarios/clienteTypes";
import { usuarioService } from "@/services/usuarios/usuarioService";
import PhoneInput from "react-phone-input-2";

export default function UsuariosNuevoPage() {
    const [roles, setRoles] = useState<rolSelectDTO[]>([]);
    const [telefono, setTelefono] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errores, setErrores] = useState<Record<string, string>>({});
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        identificacion: "",
        fechaNacimiento: "",
        email: "",
        contrasena: "",
        confirmarContrasena: "",
        rolSeleccionado: ""
    });

    useEffect(() => {
        usuarioService.obtenerRoles().then(setRoles);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrores((prev) => ({ ...prev, [name]: "" }));
    };

    const guardarUsuario = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const nuevosErrores: Record<string, string> = {};

        if (!form.nombre) nuevosErrores.nombre = "Nombre requerido";
        if (!form.apellido) nuevosErrores.apellido = "Apellido requerido";
        if (!form.identificacion) nuevosErrores.identificacion = "Identificación requerida";
        if (!form.email) nuevosErrores.email = "Correo requerido";
        if (!form.rolSeleccionado) nuevosErrores.rolSeleccionado = "Debe seleccionar un rol";
        if (!form.contrasena) nuevosErrores.contrasena = "Contraseña requerida";
        if (form.contrasena !== form.confirmarContrasena) nuevosErrores.confirmarContrasena = "Las contraseñas no coinciden";

        setErrores(nuevosErrores);
        if (Object.keys(nuevosErrores).length > 0) {
            setLoading(false);
            return;
        }

        const payload: crearUsuario = {
            userId: form.identificacion,
            userName: `${form.nombre} ${form.apellido}`,
            rolId: form.rolSeleccionado,
            email: form.email,
            phoneNumber: `+${telefono}`
        };

        try {
            await usuarioService.guardarUsuario(payload);
            setShowSuccess(true);
        } catch (error) {
            console.error("Error al crear usuario", error);
        } finally {
            setLoading(false);
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
                        <Image src="/more.png" alt="Logo" className="img-fluid me-2 img-menu-burger" width={30} height={30} />
                        <h2 className="mb-0">Registrar Usuarios</h2>
                    </div>
                </div>

                <form className="row container-form ms-2 me-2 pb-5" onSubmit={guardarUsuario}>
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label className="form-label">Nombre del usuario</label>
                            <input
                                name="nombre"
                                type="text"
                                className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
                                placeholder="Ingrese el nombre"
                                value={form.nombre}
                                onChange={handleChange}
                            />
                            {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Apellido del usuario</label>
                            <input
                                name="apellido"
                                type="text"
                                className={`form-control ${errores.apellido ? "is-invalid" : ""}`}
                                placeholder="Ingrese el apellido"
                                value={form.apellido}
                                onChange={handleChange}
                            />
                            {errores.apellido && <div className="invalid-feedback">{errores.apellido}</div>}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Identificación</label>
                            <input
                                name="identificacion"
                                type="text"
                                className={`form-control ${errores.identificacion ? "is-invalid" : ""}`}
                                placeholder="Ingrese la identificación"
                                value={form.identificacion}
                                onChange={handleChange}
                            />
                            {errores.identificacion && <div className="invalid-feedback">{errores.identificacion}</div>}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label className="form-label">Fecha de nacimiento</label>
                            <input
                                name="fechaNacimiento"
                                type="date"
                                className="form-control"
                                value={form.fechaNacimiento}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Teléfono</label>
                            <PhoneInput
                                country={'co'}
                                value={telefono}
                                onChange={setTelefono}
                                inputClass="form-control"
                                inputStyle={{ width: "100%" }}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Correo Electrónico</label>
                            <input
                                name="email"
                                type="email"
                                className={`form-control ${errores.email ? "is-invalid" : ""}`}
                                placeholder="Ingrese su correo electrónico"
                                value={form.email}
                                onChange={handleChange}
                            />
                            {errores.email && <div className="invalid-feedback">{errores.email}</div>}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label className="form-label">Rol</label>
                            <select
                                name="rolSeleccionado"
                                className={`form-select ${errores.rolSeleccionado ? "is-invalid" : ""}`}
                                value={form.rolSeleccionado}
                                onChange={handleChange}
                            >
                                <option value="">Seleccione un rol</option>
                                {roles.map((rol) => (
                                    <option key={rol.idRol} value={rol.idRol}>{rol.nombreRol}</option>
                                ))}
                            </select>
                            {errores.rolSeleccionado && <div className="invalid-feedback">{errores.rolSeleccionado}</div>}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Contraseña</label>
                            <input
                                name="contrasena"
                                type="password"
                                className={`form-control ${errores.contrasena ? "is-invalid" : ""}`}
                                placeholder="Ingrese la contraseña"
                                value={form.contrasena}
                                onChange={handleChange}
                            />
                            {errores.contrasena && <div className="invalid-feedback">{errores.contrasena}</div>}
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Confirmar contraseña</label>
                            <input
                                name="confirmarContrasena"
                                type="password"
                                className={`form-control ${errores.confirmarContrasena ? "is-invalid" : ""}`}
                                placeholder="Repita la contraseña"
                                value={form.confirmarContrasena}
                                onChange={handleChange}
                            />
                            {errores.confirmarContrasena && <div className="invalid-feedback">{errores.confirmarContrasena}</div>}
                        </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <a href="#" className="btn btn-cancel">Cancelar</a>
                        <button type="submit" className="btn btn-submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Guardando...
                                </>
                            ) : (
                                "Guardar cambios"
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {showSuccess && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-success shadow">
                            <div className="modal-header bg-success text-white">
                                <h5 className="modal-title">¡Usuario creado!</h5>
                                <button type="button" className="btn-close" onClick={() => setShowSuccess(false)}></button>
                            </div>
                            <div className="modal-body text-center">
                                <p>El usuario fue registrado exitosamente.</p>
                                <div className="text-success display-6">✔️</div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-success" onClick={() => setShowSuccess(false)}>Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

