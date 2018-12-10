export class Maquinas {
    constructor(uptime = '', macwlan0 = '', maclan0 = '', _id = '') {
            this.uptime = uptime;
            this.macwlan0 = macwlan0;
            this.maclan0 = maclan0;
            this._id = _id;

    }
    uptime: string;
    macwlan0: string;
    maclan0: string;
    _id: string;

}
