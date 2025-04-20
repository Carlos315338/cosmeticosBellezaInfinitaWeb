import api from '../api';
import { cambioClaveDTO, confirmacionPayload, UsuarioDTO } from './clienteTypes';

export const usuarioService = {

  obtenerPorId: async (id: string): Promise<UsuarioDTO> => {
    //const res = await api.get(`/usuario/findbyId/${id}`);
    //return res.data.data;
    return await Promise.resolve({
      idUsuario: "1005864715",
      nombreUsuario: "breiner andres rojas angulo",
      rol: {
        idRol: "07dabb12-135c-11f0-8abd-ea9a3a2ed3a0",
        nombreRol: "ADMIN",
        modulos: [
          { id: "166058eb-18cb-11f0-aac6-6abb6f2c6c34", nombre: "dashboard" },
          { id: "76267562-173b-11f0-adfb-f68251a0e000", nombre: "categorias" },
          { id: "79186184-173b-11f0-adfb-f68251a0e000", nombre: "proveedores" },
          { id: "7c0e3ea1-173b-11f0-adfb-f68251a0e000", nombre: "productos" },
          { id: "807b8227-173b-11f0-adfb-f68251a0e000", nombre: "usuarios" },
          { id: "8567a830-173b-11f0-adfb-f68251a0e000", nombre: "metodos-pagos" },
          { id: "89cd9cc7-173b-11f0-adfb-f68251a0e000", nombre: "ventas" },
          { id: "8d9245ff-173b-11f0-adfb-f68251a0e000", nombre: "cambiar-clave" },
          { id: "90a52612-173b-11f0-adfb-f68251a0e000", nombre: "finanzas" },
          { id: "951e8f26-173b-11f0-adfb-f68251a0e000", nombre: "configuracion" }
        ]
      }
    });
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
