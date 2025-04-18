type Ruta = {
  nombre: string;
  ruta: string;
};

export type Modulo =
  | "dashboard"
  | "clientes"
  | "categorias"
  | "proveedores"
  | "productos"
  | "usuarios"
  | "metodos-pagos"
  | "ventas"
  | "cambiar-clave"
  | "finanzas"
  | "configuracion";

export const rutasPorModulo: Record<Modulo, Ruta[]> = {
  dashboard: [{ nombre: "Dashboard", ruta: "/dashboard" }],
  clientes: [
    { nombre: "Lista de Clientes", ruta: "/dashboard/clientes/lista" },
    { nombre: "Registrar Clientes", ruta: "/dashboard/clientes/nuevo" },
  ],
  categorias: [{ nombre: "Categorías", ruta: "/dashboard/categorias" }],
  proveedores: [
    { nombre: "Lista de Proveedores", ruta: "/dashboard/proveedores/lista" },
    { nombre: "Registrar Proveedores", ruta: "/dashboard/proveedores/nuevo" },
  ],
  productos: [
    { nombre: "Lista de Productos", ruta: "/dashboard/productos/lista" },
    { nombre: "Registrar Productos", ruta: "/dashboard/productos/nuevo" },
  ],
  usuarios: [
    { nombre: "Lista de Usuarios", ruta: "/dashboard/usuarios/lista" },
    { nombre: "Registrar Usuarios", ruta: "/dashboard/usuarios/nuevo" },
  ],
  "metodos-pagos": [
    { nombre: "Métodos de Pago", ruta: "/dashboard/metodos-pago" },
  ],
  ventas: [{ nombre: "Registrar Ventas", ruta: "/dashboard/ventas/nuevo" }],
  "cambiar-clave": [
    { nombre: "Cambiar Contraseña", ruta: "/auth/cambiar-clave" },
  ],
  finanzas: [{ nombre: "Finanzas", ruta: "/dashboard/finanzas" }],
  configuracion: [
    { nombre: "Configuraciones", ruta: "/dashboard/configuracion" },
  ],
};
