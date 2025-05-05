"use client";

import { useEffect, useState } from "react";

export default function AlertaGlobal({ mensaje }: { mensaje: string }) {
    const [visible, setVisible] = useState(true);
    const [cerrando, setCerrando] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCerrando(true);
            setTimeout(() => setVisible(false), 400); // tiempo igual a fadeOut
        }, 3000);
        return () => clearTimeout(timeout);
    }, []);

    const cerrarManual = () => {
        setCerrando(true);
        setTimeout(() => setVisible(false), 400);
    };

    if (!visible) return null;

    return (
        <div
            className={`alert-global ${cerrando ? "fade-out" : ""}`}
            role="alert"
        >
            <span>{mensaje}</span>
            <button onClick={cerrarManual} className="btn-cerrar">×</button>
        </div>
    );
}

