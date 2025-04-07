import api from '../api';
import { UsuarioDTO } from './clienteTypes';

export const usuarioService = {

  obtenerPorId: async (id: string): Promise<UsuarioDTO> => {
    const res = await api.get(`/usuario/findbyId/${id}`);
    return res.data;
  },

};
