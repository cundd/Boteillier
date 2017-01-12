/**
 * Created by daniel on 06.12.16.
 */
import Ajax from './Ajax';
const EF = () => {
};

export default class ServiceScanner {
    constructor() {
        /**
         * @type {Store}
         */
        this.store = {};

        /**
         * @type {string}
         */
        this.servicePort = '8181';
    }

    static needs() {
        return ['store'];
    }

    /**
     * Scan the network for services
     *
     * @param {function} serviceAvailable
     */
    findServices(serviceAvailable = null) {
        const location = window && window.location;
        const hostname = location.hostname;
        const store = this.store;
        const serviceAvailableCallback = function (request, info) {
            const url = info.url;
            const data = info.data;
            store.addService(url, data);
            store.updateState({loading: false})

            if (typeof serviceAvailable === 'function') {
                serviceAvailable(url, data, request);
            }
        };

        store.updateState({loading: true});

        if (/^[0-9]{0,3}\.[0-9]{0,3}\.[0-9]{0,3}\.[0-9]{0,3}$/.test(hostname)) {
            this._splitAndTestIps(location, serviceAvailableCallback);
        } else {
            this._readHostIpAndScan(location, serviceAvailableCallback);
        }
    }

    _readHostIpAndScan(location, serviceAvailableCallback) {
        const localInfoUrl = location.protocol + '//' + location.hostname + ':' + this.servicePort + '/info';
        Ajax.json(localInfoUrl, 'GET').then(function (request, info) {
            this._splitAndTestIps(this._createLocationObject(info, location), serviceAvailableCallback);
        }.bind(this));
    }

    _createLocationObject(info, location) {
        return {
            hostname: info.data.ip,
            port: this.servicePort,
            protocol: location.protocol
        };
    }

    _splitAndTestIps(location, serviceAvailableCallback) {
        let ipParts = location.hostname.split('.');
        const lastIpPart = ipParts.pop();

        const testing = false;
        if (testing) {
            // For testing
            this._scanIps(serviceAvailableCallback, ipParts, [lastIpPart], location.port, location.protocol);
        } else {
            this._scanIps(serviceAvailableCallback, ipParts, ServiceScanner._range(lastIpPart, 1, 255), location.port, location.protocol);
        }
    }

    _scanIps(serviceAvailable, ipParts, range, port, scheme) {
        range.forEach(function (ip) {
            const ipElements = ipParts.slice();
            ipElements.push(ip);

            // this._scanIp(serviceAvailable, ipElements, port, scheme);
            this._scanIp(serviceAvailable, ipElements, this.servicePort, scheme);
        }.bind(this));
    }

    _scanIp(serviceAvailable, ipParts, port, scheme) {
        const url = scheme + '//' + ipParts.join('.') + ':' + port + '/info';

        Ajax.json(url, 'GET').then(serviceAvailable);
    }

    static _range(base, lowerLimit, upperLimit, step = 1) {
        base = parseInt(base);
        let result = [base];
        let lower = base;
        let upper = base;
        do {
            lower -= step;
            upper += step;
            result.push(lower);
            result.push(upper);
        } while (lowerLimit < lower && upperLimit > upper);
        return result;
    };
}
