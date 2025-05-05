import api from '../api';
import { ApiPageResponse } from '../commonTypes';
import { ClienteDTO } from './finanzaType';

const CONTEXT = '/mc-finanzas';

export const finanzaService = {

    obtenerClientes: async (page: number = 0, size: number = 5, sortField: string, sortOrder: string, nombre: string): Promise<ApiPageResponse<ClienteDTO>> => {
        const res = await api.post(`${CONTEXT}/cliente/clientes`, { page, size, sortField, sortOrder, nombre });
        return res.data.data;
    },

    obtenerCantidadClientes: async (): Promise<number> => {
        const res = await api.get(`${CONTEXT}/cliente/cantidadCliente`);
        return res.data.data;
    },

    eliminacionCliente: async (id: string): Promise<string> => {
        const res = await api.delete(`${CONTEXT}/cliente/${id}`);
        return res.data.message;
    },
    
    actualizacionCliente: async (id: string, updateCliente: ClienteDTO): Promise<string> => {
        const res = await api.post(`${CONTEXT}/cliente/updateCliente/${id}`, updateCliente);
        return res.data.message;
    },

};
