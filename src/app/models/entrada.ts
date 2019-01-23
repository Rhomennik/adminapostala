export class Entrada {

    constructor(_id = '', codigo = '', nome = '', fecha = '') {
        this._id = _id;
        this.codigo = codigo;
        this.nome = nome;
        this.fecha = fecha;
    }

    _id: string;
    codigo: string;
    nome: string;
    fecha: string;
}
