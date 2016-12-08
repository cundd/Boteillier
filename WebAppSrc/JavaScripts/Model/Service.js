/**
 * Created by daniel on 08.12.16.
 */
export default class Service {
    constructor(url, hostName, ip) {
        this._url = url;
        this._hostName = hostName;
        this._ip = ip;
    }

    get ip() {
        return this._ip;
    }

    get url() {
        return this._url;
    }

    get hostName() {
        return this._hostName;
    }
}