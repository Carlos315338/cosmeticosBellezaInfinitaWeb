import api from '../api';
import { ProductoPaginadoResponse, ProveedorSelectDTO } from './productoTypes';

export const productoService = {

  obtenerProductos: async (page: number = 0, size: number = 5 , orden: string = "idProducto"): Promise<ProductoPaginadoResponse> => {
    const res = await api.get(`/producto/productos`, { params: { page, size, orden }});
    return res.data.data;
  },

  obtenerListaSelect: async (): Promise<ProveedorSelectDTO[]> => {
    const res = await api.get("/proveedor/proveedorSelect");
    return res.data.data;
  }
  
};