export class Maquinas {
    constructor(uptime = '', mac = '', ippublica = '', _id = '', iplocal = '', updatedAt = '') {
            this.uptime = uptime;
            this.mac = mac;
            this.ippublica = ippublica;
            this.iplocal = iplocal;
            this.updatedAt = updatedAt;
            this._id = _id;

    }
    uptime: string;
    mac: string;
    ippublica: string;
    iplocal: string;
    _id: string;
    updatedAt: string;

}
