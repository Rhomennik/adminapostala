export class Employee {

    constructor(_id = '', codigo = '', cliente = '', fecha = '', perfil = '', contador = '') {
        this._id = _id;
        this.codigo = codigo;
        this.cliente = cliente;
        this.fecha = fecha;
        perfil = perfil;
        contador = contador;
    }

    _id: string;
    codigo: string;
    cliente: string;
    fecha: string;
    perfil: Boolean;
    contador: number;
}
