import api from '../api';
import { cambioClaveDTO, confirmacionPayload, UsuarioDTO } from './clienteTypes';

export const usuarioService = {

  obtenerPorId: async (id: string): Promise<UsuarioDTO> => {
    const res = await api.get(`/usuario/findbyId/${id}`);
    return res.data;
  },

  confirmSignIn: async (confirmacionPayload: confirmacionPayload): Promise<UsuarioDTO> => {
    const res = await api.post(`/usuario/confirmacion-clave`, confirmacionPayload);
    return res.data;
  },

  cambiarClave: async (cambioclavePayload : cambioClaveDTO): Promise<UsuarioDTO> => {
    const res = await api.post(`/usuario/cambio-clave`, cambioclavePayload);
    return res.data;
  },

};
