export interface ClienteDTO {
    id: string,
    identificacion : string,
    primerNombre: string,
    segundoNombre: string,
    primerApellido: string,
    segundoApellido: string,
    correoElectronico:string,
    telefono: string
}

export interface ResumenDTO {
    cantidad: number,
    total: number
}

