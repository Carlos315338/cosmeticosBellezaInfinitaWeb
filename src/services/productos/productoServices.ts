import api from '../api';
import { ApiPageResponse } from '../commonTypes';
import { CategoriaSelectDTO, ProductoDTO, ProductoUpdateDTO, ProveedorDTO, ProveedorSelectDTO } from './productoTypes';

const CONTEXT = '/mc-producto';

export const productoService = {

    obtenerProductos: async (page: number = 0, size: number = 5, sortField: string, sortOrder: string, nombre: string): Promise<ApiPageResponse<ProductoDTO>> => {
        const res = await api.post(`${CONTEXT}/producto/productos`, { page, size, sortField, sortOrder, nombre });
        return res.data.data;
    },

    obtenerProveedores: async (page: number = 0, size: number = 5, sortField: string, sortOrder: string, nombre: string): Promise<ApiPageResponse<ProveedorDTO>> => {
        const res = await api.post(`${CONTEXT}/proveedor/proveedores`, { page, size, sortField, sortOrder, nombre });
        return res.data.data;
    },

    obtenerProveedorListaSelect: async (): Promise<ProveedorSelectDTO[]> => {
        const res = await api.get(`${CONTEXT}/proveedor/proveedorSelect`);
        return res.data.data;
    },

    obtenerCategoriaListaSelect: async (): Promise<CategoriaSelectDTO[]> => {
        const res = await api.get(`${CONTEXT}/categoria/categoriaSelect`);
        return res.data.data;
    },

    eliminacionProducto: async (id: string): Promise<string> => {
        const res = await api.delete(`${CONTEXT}/producto/${id}`);
        return res.data.message;
    },

    eliminacionProveedor: async (id: string): Promise<string> => {
        const res = await api.delete(`${CONTEXT}/proveedor/${id}`);
        return res.data.message;
    },

    obtenerCantidadProductos: async (): Promise<number> => {
        const res = await api.get(`${CONTEXT}/producto/cantidadProductos`);
        return res.data.data;
    },

    obtenerCantidadProveedores: async (): Promise<number> => {
        const res = await api.get(`${CONTEXT}/proveedor/cantidadProveedores`);
        return res.data.data;
    },

    obtenerCantidadCategoria: async (): Promise<number> => {
        const res = await api.get(`${CONTEXT}/categoria/cantidadCategoria`);
        return res.data.data;
    },

    actualizarProveedor: async (id: string, updateProveedor: ProveedorDTO): Promise<string> => {
        const res = await api.post(`${CONTEXT}/proveedor/updateProveedor/${id}`, updateProveedor);
        return res.data.message;
    },

    actualizacionProducto: async (id: string, updateProducto: ProductoUpdateDTO): Promise<string> => {
        const res = await api.post(`${CONTEXT}/producto/updateProducto/${id}`, updateProducto);
        return res.data.message;
    },
};
