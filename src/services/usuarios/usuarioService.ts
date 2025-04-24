import api from '../api';
import { ApiPageResponse } from '../commonTypes';
import { cambioClaveDTO, confirmacionPayload, crearUsuario, rolSelectDTO, UsuarioDTO } from './clienteTypes';

export const usuarioService = {

    obtenerPorId: async (id: string): Promise<UsuarioDTO> => {
        const res = await api.get(`/usuario/findbyId/${id}`);
        return res.data.data;
    },

    confirmSignIn: async (confirmacionPayload: confirmacionPayload): Promise<UsuarioDTO> => {
        const res = await api.post(`/usuario/confirmacion-clave`, confirmacionPayload);
        return res.data.data;
    },

    cambiarClave: async (cambioclavePayload: cambioClaveDTO): Promise<UsuarioDTO> => {
        const res = await api.post(`/usuario/cambio-clave`, cambioclavePayload);
        return res.data.data;
    },

    obtenerUsuarios: async (page: number = 0, size: number = 5): Promise<ApiPageResponse<UsuarioDTO>> => {
        const res = await api.get(`/usuario/obtenerListaUsuarios`, { params: { page, size } });
        return res.data.data;
    },

    obtenerRoles: async (): Promise<rolSelectDTO[]> => {
        const res = await api.get(`/roles/obtenerSelectRol`);
        return res.data.data;
    },

    guardarUsuario: async (data: crearUsuario): Promise<rolSelectDTO[]> => {
        const res = await api.post(`/usuario/crearUsuario`, data);
        return res.data.data;
    },

    eliminacionUsuario: async (id: string): Promise<string> => {
        const res = await api.delete(`/usuario/${id}`);
        return res.data.message;
    },

    actualizarUSuario: async (user: UsuarioDTO): Promise<UsuarioDTO> => {
        const res = await api.post(`/usuario/actualizarUsuario`, user);
        return res.data.data;
    }
};
