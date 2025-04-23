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
        obtenerRolesSelect();
    }, []);

    const obtenerRolesSelect = async () => {
        const data = await usuarioService.obtenerRoles();
        setRoles(data);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const guardarUsuario = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload: crearUsuario = {
            userId: form.identificacion,
            userName: `${form.nombre} ${form.apellido}`,
            rolId: form.rolSeleccionado,
            email: form.email,
            phoneNumber: `+${telefono}`
        };

        try {
            const respuesta = await usuarioService.guardarUsuario(payload);
            alert("Usuario creado con éxito");
            console.log(respuesta);
        } catch (error) {
            console.error("Error al crear usuario", error);
            alert("Hubo un error al guardar el usuario");
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
                            className="img-fluid me-2 img-menu-burger"
                            alt="Logo"
                            width={30}
                            height={30}
                        />
                        <h2 className="mb-0">Registrar Usuarios</h2>
                    </div>
                </div>

                <form className="row container-form ms-2 me-2 pb-5" onSubmit={guardarUsuario}>
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label className="form-label">Nombre del usuario</label>
                            <input name="nombre" type="text" className="form-control" placeholder="Ingrese el nombre" value={form.nombre} onChange={handleChange} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Apellido del usuario</label>
                            <input name="apellido" type="text" className="form-control" placeholder="Ingrese el apellido" value={form.apellido} onChange={handleChange} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Identificación</label>
                            <input name="identificacion" type="text" className="form-control" placeholder="Ingrese la identificación" value={form.identificacion} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label className="form-label">Fecha de nacimiento</label>
                            <input name="fechaNacimiento" type="date" className="form-control" value={form.fechaNacimiento} onChange={handleChange} />
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
                            <input name="email" type="email" className="form-control" placeholder="Ingrese su correo electrónico" value={form.email} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label className="form-label">Rol</label>
                            <select
                                name="rolSeleccionado"
                                className="form-select"
                                value={form.rolSeleccionado}
                                onChange={handleChange}
                            >
                                <option value="">Seleccione un rol</option>
                                {roles.map((rol) => (
                                    <option key={rol.idRol} value={rol.nombreRol}>
                                        {rol.nombreRol}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Contraseña</label>
                            <input name="contrasena" type="password" className="form-control" placeholder="Ingrese la contraseña" value={form.contrasena} onChange={handleChange} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Confirmar contraseña</label>
                            <input name="confirmarContrasena" type="password" className="form-control" placeholder="Repita la contraseña" value={form.confirmarContrasena} onChange={handleChange} />
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
