import api from '../api';
import { ApiPageResponse } from '../commonTypes';
import { ClienteDTO } from './finanzaType';

export const finanzaService = {

    obtenerClientes: async (page: number = 0, size: number = 5): Promise<ApiPageResponse<ClienteDTO>> => {
        const res = await api.get(`/cliente/clientes`, { params: { page, size } });
        return res.data.data;
    },

    obtenerCantidadClientes: async (): Promise<number> => {
        const res = await api.get(`/cliente/cantidadCliente`);
        return res.data.data;
    },

    eliminacionCliente: async (id: string): Promise<string> => {
        const res = await api.delete(`/proveedor/${id}`);
        return res.data.message;
    },
};
