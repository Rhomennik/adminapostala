export class Entrada {

    constructor(_id = '', codigo = '', nome = '', fecha = '', updatedAt = '') {
        this._id = _id;
        this.codigo = codigo;
        this.nome = nome;
        this.fecha = fecha;
        this.updatedAt = updatedAt;
    }

    _id: string;
    codigo: string;
    nome: string;
    fecha: string;
    updatedAt: string;
}
