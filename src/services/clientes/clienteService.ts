import api from '../api';
import { Cliente, CrearClienteDTO, UsuarioDTO } from './clienteTypes';

export const clienteService = {
  listar: async (): Promise<Cliente[]> => {
    const res = await api.get('/clientes');
    return res.data;
  },

  obtenerPorId: async (id: string): Promise<UsuarioDTO> => {
    const res = await api.get(`/usuario/findbyId/${id}`);
    return res.data;
  },

  crear: async (data: CrearClienteDTO): Promise<Cliente> => {
    const res = await api.post('/clientes', data);
    return res.data;
  },

  actualizar: async (id: string, data: Partial<CrearClienteDTO>): Promise<Cliente> => {
    const res = await api.put(`/clientes/${id}`, data);
    return res.data;
  },

  eliminar: async (id: string): Promise<void> => {
    await api.delete(`/clientes/${id}`);
  },
};
