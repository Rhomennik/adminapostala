export class Tarjetas {

    constructor(_id = '', codigo = '', cliente = '', fecha = '', contador = '', perfil = '', updatedAt = '') {
        this._id = _id;
        this.codigo = codigo;
        this.cliente = cliente;
        this.fecha = fecha;
        perfil = perfil;
        contador = contador;
        updatedAt = updatedAt;
    }

    _id: string;
    codigo: string;
    cliente: string;
    fecha: string;
    perfil: number;
    contador: number;
    updatedAt: String;
}
