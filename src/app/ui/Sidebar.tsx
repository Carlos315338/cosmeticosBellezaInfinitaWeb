'use client';
import { useEffect } from 'react';

export default function Sidebar() {
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min.js');
      }, []);

  return (
    <nav className="nav p-3">
      <details className="col-12 nav__details" open>
        <summary className="nav__tittle p-3">Inicio</summary>
      </details>

      <details className="col-12 nav__details">
        <summary className="nav__summary">Clientes</summary>
        <ul className="nav__list">
          <li className="col-12 nav__list-item">Lista de Clientes</li>
          <li className="col-12 nav__list-item">Registrar Clientes</li>
        </ul>
      </details>

      <details className="col-12 nav__details">
        <summary className="nav__summary">Categorías</summary>
      </details>

      <details className="col-12 nav__details">
        <summary className="nav__summary">Proveedores</summary>
        <ul className="nav__list">
          <li className="col-12 nav__list-item">Lista de Proveedores</li>
          <li className="col-12 nav__list-item">Registrar Proveedores</li>
        </ul>
      </details>

      <details className="col-12 nav__details">
        <summary className="nav__summary">Productos</summary>
        <ul className="nav__list">
          <li className="col-12 nav__list-item">Lista de Productos</li>
          <li className="col-12 nav__list-item">Registrar Productos</li>
        </ul>
      </details>

      <details className="col-12 nav__details">
        <summary className="nav__summary">Usuarios</summary>
        <ul className="nav__list">
          <li className="col-12 nav__list-item">Lista de Usuarios</li>
          <li className="col-12 nav__list-item">Registrar Usuarios</li>
        </ul>
      </details>

      <details className="col-12 nav__details">
        <summary className="nav__summary">Métodos de Pago</summary>
      </details>

      <details className="col-12 nav__details">
        <summary className="nav__summary">Ventas</summary>
        <ul className="nav__list">
          <li className="col-12 nav__list-item">Registrar Ventas</li>
        </ul>
      </details>

      <details className="col-12 nav__details">
        <summary className="nav__summary">Cambiar Contraseña</summary>
      </details>

      <details className="col-12 nav__details">
        <summary className="nav__summary">Finanzas</summary>
      </details>

      <details className="col-12 nav__details">
        <summary className="nav__summary">Configuraciones</summary>
      </details>
    </nav>
  );
}
