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

export interface ProductoPaginadoResponse {
  content: ProductoDTO[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

export interface ProveedorSelectDTO {
  idProveedor: string;
  nombreProveedor: string;
}

