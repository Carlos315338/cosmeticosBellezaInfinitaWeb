export interface CategoriaDTO {
  idCategoria: string;
  nombreCategoria: string;
}

export interface ProveedorDTO {
  idProveedor: string;
  nitProveedor: string;
  nombreProveedor: string;
  correoElectronico: string;
  telefono: string;
}

export interface ProductoDTO {
  idProducto: string;
  codigoDeBarras: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: CategoriaDTO;
  proveedor: ProveedorDTO;
}
  