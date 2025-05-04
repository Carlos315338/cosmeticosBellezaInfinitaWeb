import api from '../api';
import { ApiPageResponse } from '../commonTypes';
import { ClienteDTO } from './finanzaType';

const CONTEXT = '/mc-producto';

export const finanzaService = {

    obtenerClientes: async (page: number = 0, size: number = 5): Promise<ApiPageResponse<ClienteDTO>> => {
        const res = await api.get(`${CONTEXT}/cliente/clientes`, { params: { page, size } });
        return res.data.data;
    },

    obtenerCantidadClientes: async (): Promise<number> => {
        const res = await api.get(`${CONTEXT}/cliente/cantidadCliente`);
        return res.data.data;
    },

    eliminacionCliente: async (id: string): Promise<string> => {
        const res = await api.delete(`${CONTEXT}/proveedor/${id}`);
        return res.data.message;
    },
};
