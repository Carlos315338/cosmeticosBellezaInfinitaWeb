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
    contrasenha?: string;
    rol: RolDTO;
    esprimeravez?: boolean;
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
    username: string;
    tempPassword: string;
    newPassword: string;
}

export interface cambioClaveDTO {
    idUser: string;
    contrasenaActual: string;
    contrasenaNueva: string;
    accessToken: string;
}

export interface rolSelectDTO {
    idRol: string;
    nombreRol: string;
}
