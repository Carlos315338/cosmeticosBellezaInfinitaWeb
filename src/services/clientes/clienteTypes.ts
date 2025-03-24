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
  