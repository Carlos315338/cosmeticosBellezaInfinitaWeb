"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchAuthSession } from "@aws-amplify/core";
import { useRouter } from "next/navigation";
import { usuarioService } from "@/services/usuarios/usuarioService";
import {
    cambioClaveDTO,
    confirmacionPayload,
} from "@/services/usuarios/clienteTypes";
import { useAuth } from "@/context/AuthContext";
import { signIn, signOut } from "@aws-amplify/auth";

export default function CambiarContrasenaPage() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const router = useRouter();
    const { user, setAuthData } = useAuth();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            alert("Las nuevas contraseñas no coinciden");
            return;
        }

        try {


            if (!user) return;

            if (user?.esprimeravez) {
                
                const payload: confirmacionPayload = {
                    username: user.idUsuario,
                    tempPassword: currentPassword,
                    newPassword: newPassword,
                };

                await usuarioService.confirmSignIn(payload);
                await signOut();
                await signIn({ username: user.idUsuario, password: newPassword });
                const usuarioLogueado = await usuarioService.obtenerPorId(
                    user.idUsuario
                );

                setAuthData(usuarioLogueado);
            } else {

                const session = await fetchAuthSession();
                const accessToken = session.tokens?.accessToken?.toString();

                const payload: cambioClaveDTO = {
                    idUser: user.idUsuario,
                    contrasenaActual: currentPassword,
                    contrasenaNueva: newPassword,
                    accessToken: accessToken || "",
                };

                await usuarioService.cambiarClave(payload);
            }

            alert("Contraseña actualizada correctamente");  
            router.push("/dashboard");
        } catch (error: any) {
            console.error("Error al cambiar la contraseña:", error);
            alert(error.message || "No se pudo cambiar la contraseña");
        }
    };

    return (
        <main className="forgot-container">
            <Image
                src="/logo.png"
                alt="Logo Belleza Infinita"
                width={180}
                height={180}
                className="forgot-container__logo"
            />

            <form autoComplete="off" className="forgot-box" onSubmit={handleSubmit}>
                <h2 className="forgot-box__title">Cambiar contraseña</h2>

                <label htmlFor="currentPassword" className="forgot-box__label">
                    Contraseña actual
                </label>
                <input
                    autoComplete="off"
                    type="password"
                    id="currentPassword"
                    className="forgot-box__input"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />

                <label htmlFor="newPassword" className="forgot-box__label">
                    Nueva contraseña
                </label>
                <input
                    autoComplete="off"
                    type="password"
                    id="newPassword"
                    className="forgot-box__input"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <label htmlFor="confirmNewPassword" className="forgot-box__label">
                    Vuelva a escribir la nueva contraseña
                </label>
                <input
                    autoComplete="off"
                    type="password"
                    id="confirmNewPassword"
                    className="forgot-box__input"
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                />

                <section className="forgot-box-section d-flex justify-content-around pt-3">
                    <a href="/dashboard" className="forgot-box-section__cancel">
                        Cancelar
                    </a>
                    <button type="submit" className="forgot-box-section__button">
                        Guardar cambios
                    </button>
                </section>
            </form>
        </main>
    );
}
