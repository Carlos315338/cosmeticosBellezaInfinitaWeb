"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Sidebar() {

  const router = useRouter();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <nav className="nav text-decoration-none">
      <details className="col-12 nav__details" open>
        <summary className="nav__tittle text-center" onClick={() => router.push('/dashboard')}>Inicio</summary>
      </details>

      <details className="col-12 nav__details">
        <summary className="nav__summary ps-4">Clientes</summary>
        <ul className="nav__list w-100 d-block ps-5">
          <li className="nav__list-item w-100" onClick={() => router.push('/dashboard/clientes/lista')}>Lista de Clientes</li>
          <li className="nav__list-item w-100" onClick={() => router.push('/dashboard/clientes/nuevo')}>Registrar Clientes</li>
        </ul>
      </details>

      <details className="col-12 nav__details">
        <summary className="nav__summary ps-4" onClick={() => router.push('/dashboard/categorias')}>Categorías</summary>
      </details>

      <details className="col-12 nav__details">
        <summary className="nav__summary ps-4">Proveedores</summary>
        <ul className="nav__list  w-100 d-block ps-5">
          <li className="nav__list-item w-100" onClick={() => router.push('/dashboard/proveedores/lista')}>Lista de Proveedores</li>
          <li className="nav__list-item w-100" onClick={() => router.push('/dashboard/proveedores/nuevo')}>Registrar Proveedores</li>
        </ul>
      </details>

      <details className="col-12 nav__details">
        <summary className="nav__summary ps-4">Productos</summary>
        <ul className="nav__list  w-100 d-block ps-5">
          <li className="nav__list-item w-100">Lista de Productos</li>
          <li className="nav__list-item w-100">Registrar Productos</li>
        </ul>
      </details>

      <details className="col-12 nav__details">
        <summary className="nav__summary ps-4">Usuarios</summary>
        <ul className="nav__list  w-100 d-block ps-5">
          <li className="nav__list-item w-100">Lista de Usuarios</li>
          <li className="nav__list-item w-100">Registrar Usuarios</li>
        </ul>
      </details>

      <details className="col-12 nav__details">
        <summary className="nav__summary ps-4">Métodos de Pago</summary>
      </details>

      <details className="col-12 nav__details">
        <summary className="nav__summary ps-4">Ventas</summary>
        <ul className="nav__list  w-100 d-block ps-5">
          <li className="nav__list-item w-100">Registrar Ventas</li>
        </ul>
      </details>

      <details className="col-12 nav__details">
        <summary className="nav__summary ps-4">Cambiar Contraseña</summary>
      </details>

      <details className="col-12 nav__details">
        <summary className="nav__summary ps-4">Finanzas</summary>
      </details>

      <details className="col-12 nav__details">
        <summary className="nav__summary ps-4">Configuraciones</summary>
      </details>
    </nav>
  );
}
