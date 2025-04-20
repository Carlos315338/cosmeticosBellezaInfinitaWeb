"use client";

import { Modulo, rutasPorModulo } from "@/constants/menu";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Sidebar() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const modulos = user?.rol.modulos.filter((item) => item.nombre != "dashboard" ).map((mod) => mod.nombre) || [];
  
  return (
    <nav className="nav text-decoration-none">
      <details className="col-12 nav__details" open>
        <summary className="nav__tittle text-center" onClick={() => router.push('/dashboard')}>Inicio</summary>
      </details>

      {modulos.map((moduloNombre) => {
        const rutas = rutasPorModulo[moduloNombre as Modulo];
        if (!rutas || rutas.length === 0) return null;

        const esUnicoEnlace = rutas.length === 1;
        const rutaUnica = rutas[0];

        return (
          <details key={moduloNombre} className="col-12 nav__details">
            <summary
              className="nav__summary ps-4 capitalize"
              onClick={() => {
                if (esUnicoEnlace) {
                  router.push(rutaUnica.ruta);
                }
              }}
            >
              {moduloNombre.replace("-", " ")}
            </summary>

            {!esUnicoEnlace && (
              <ul className="nav__list w-100 d-block ps-5">
                {rutas.map((ruta) => (
                  <li
                    key={ruta.ruta}
                    className="nav__list-item w-100"
                    onClick={() => router.push(ruta.ruta)}
                  >
                    {ruta.nombre}
                  </li>
                ))}
              </ul>
            )}
          </details>
        );
      })}

    </nav>
  );
}
