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

            if (typeof serviceAvailable === 'function') {
                serviceAvailable(url, data, request);
            }
        };

        if (/^[0-9]{0,3}\.[0-9]{0,3}\.[0-9]{0,3}\.[0-9]{0,3}$/.test(hostname)) {
            let ipParts = hostname.split('.');

            const testing = false;
            if (testing) {
                // For testing
                const lastIpPart = ipParts.pop();
                this._testIps(serviceAvailableCallback, ipParts, [lastIpPart], location.port, location.protocol);
            } else {
                ipParts.pop();
                this._testIps(serviceAvailableCallback, ipParts, ServiceScanner._range(1, 255), location.port, location.protocol);
            }
        } else {
            throw new ReferenceError('Could not determine IP range for hostname "' + hostname + '"');
        }
    }

    _testIps(serviceAvailable, ipParts, range, port, scheme) {
        range.forEach(function (ip) {
            const ipElements = ipParts.slice();
            ipElements.push(ip);

            // this._testIp(serviceAvailable, ipElements, port, scheme);
            this._testIp(serviceAvailable, ipElements, '8181', scheme);
        }.bind(this));
    }

    _testIp(serviceAvailable, ipParts, port, scheme) {
        const url = scheme + '//' + ipParts.join('.') + ':' + port + '/info';

        this._ajax('GET', url, serviceAvailable, function () {
            // console.log(arguments)
        });
    }

    _ajax(method, url, success = EF, error = EF) {
        Ajax.json(url, method).then(success).else(error)
    }

    static _range(start, stop, step) {
        if (typeof stop == 'undefined') {
            // one param defined
            stop = start;
            start = 0;
        }

        if (typeof step == 'undefined') {
            step = 1;
        }

        if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
            return [];
        }

        let result = [];
        for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
            result.push(i);
        }

        return result;
    };
}
