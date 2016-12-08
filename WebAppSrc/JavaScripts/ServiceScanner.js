/**
 * Created by daniel on 06.12.16.
 */

const EF = () => {
};

export default class ServiceScanner {
    findServices(serviceAvailable) {
        const location = window && window.location;
        const hostname = location.hostname;

        if (/^[0-9]{0,3}\.[0-9]{0,3}\.[0-9]{0,3}\.[0-9]{0,3}$/.test(hostname)) {
            let ipParts = hostname.split('.');

            const lastIpPart = ipParts.pop();

            // this._testIps(serviceAvailable, ipParts, ServiceScanner._range(20, 30), location.port, location.protocol);
            this._testIps(serviceAvailable, ipParts, [lastIpPart], location.port, location.protocol);
            // this._testIps(serviceAvailable, ipParts, ServiceScanner._range(1, 255), location.port, location.protocol);
        }
    }

    _testIps(serviceAvailable, ipParts, range, port, scheme) {
        range.forEach(function (ip) {
            const ipElements = ipParts.slice();
            ipElements.push(ip);

            this._testIp(serviceAvailable, ipElements, port, scheme);
            this._testIp(serviceAvailable, ipElements, '8181', scheme);
        }.bind(this));
    }

    _testIp(serviceAvailable, ipParts, port, scheme) {
        const url = scheme + '//' + ipParts.join('.') + ':' + port + '/info';

        this._ajax('GET', url, serviceAvailable);
    }

    _ajax(method, url, success = EF, error = EF) {
        const request = new XMLHttpRequest();
        request.open(method, url, true);
        request.setRequestHeader('Content-Type', 'application/javascript');

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                try {
                    var data = JSON.parse(request.responseText);
                    success(url, data, request);
                } catch (exception) {
                    error(request, {
                        "exception": exception
                    });
                }
            } else {
                error(request);
            }
        };

        request.onerror = function () {
            error(request);
        };

        request.send();

        setTimeout(function () {
            request.abort();
            error(request);
        }, 4000);
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