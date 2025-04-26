import api from '../api';
import { ApiPageResponse } from '../commonTypes';
import { CategoriaSelectDTO, ProductoDTO, ProveedorDTO, ProveedorSelectDTO } from './productoTypes';

export const productoService = {

    obtenerProductos: async (page: number = 0, size: number = 5, orden: string = "idProducto"): Promise<ApiPageResponse<ProductoDTO>> => {
        const res = await api.get(`/producto/productos`, { params: { page, size, orden } });
        return res.data.data;
    },

    obtenerProveedores: async (page: number = 0, size: number = 5): Promise<ApiPageResponse<ProveedorDTO>> => {
        const res = await api.get(`/proveedor/proveedores`, { params: { page, size } });
        return res.data.data;
    },

    obtenerProveedorListaSelect: async (): Promise<ProveedorSelectDTO[]> => {
        const res = await api.get("/proveedor/proveedorSelect");
        return res.data.data;
    },

    obtenerCategoriaListaSelect: async (): Promise<CategoriaSelectDTO[]> => {
        const res = await api.get("/categoria/categoriaSelect");
        return res.data.data;
    },

    eliminacionProducto: async (id: string): Promise<string> => {
        const res = await api.delete(`/producto/${id}`);
        return res.data.message;
    },

    eliminacionProveedor: async (id: string): Promise<string> => {
        const res = await api.delete(`/proveedor/${id}`);
        return res.data.message;
    },
    
    obtenerCantidadProductos: async (): Promise<number> => {
        const res = await api.get(`/producto/cantidadProductos`);
        return res.data.data;
    },
    
    obtenerCantidadProveedores: async (): Promise<number> => {
        const res = await api.get(`/proveedor/cantidadProveedores`);
        return res.data.data;
    },
    
    obtenerCantidadCategoria: async (): Promise<number> => {
        const res = await api.get(`/categoria/cantidadCategoria`);
        return res.data.data;
    },
};
