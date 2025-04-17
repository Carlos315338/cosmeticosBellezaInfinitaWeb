export interface Cliente {
  id: string;
  nombre: string;
  identificacion: string;
  direccion: string;
  correo: string;
  telefono: string;
}

export interface CrearClienteDTO {
  nombre: string;
  identificacion: string;
  direccion: string;
  correo: string;
  telefono: string;
}

export interface UsuarioDTO {
  idUsuario: string;
  nombreUsuario: string;
  contrasenha: string;
  rol: RolDTO;
}

export interface RolDTO {
  idRol: string;
  nombreRol: string;
  modulos: ModuloDTO[];
}

export interface ModuloDTO {
  id: string;
  nombre: string;
}

export interface confirmacionPayload {
  username: string,
  tempPassword: string,
  newPassword: string
};
