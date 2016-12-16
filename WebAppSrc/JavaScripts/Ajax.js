/**
 * Created by daniel on 16.12.16.
 */
const EF = () => {
};

class Promise {
    constructor(request, timeout, userData = {}) {
        const self = this;
        this._then = EF;
        this._else = EF;

        request.onload = function () {
            const status = request.status;
            if (status >= 200 && status < 400) {
                try {
                    const data = JSON.parse(request.responseText);
                    const successData = Object.assign({}, userData, {"data": data});
                    self._then(request, successData);
                } catch (exception) {
                    self._else(request, {
                        "exception": exception
                    });
                }
            } else {
                self._else(request, {
                    "exception": new RangeError("Error status", status)
                });
            }
        };

        request.onerror = function () {
            self._else(request);
        };

        setTimeout(function () {
            request.abort();
            self._else(request, {
                "error": "timeout"
            });
        }, parseInt(timeout));
    }

    else(elseCallback) {
        if (typeof elseCallback !== 'function') {
            throw new TypeError('Argument 1 must be a valid callback');
        }
        this._else = elseCallback;

        return this;
    }

    then(thenCallback) {
        if (typeof thenCallback !== 'function') {
            throw new TypeError('Argument 1 must be a valid callback');
        }
        this._then = thenCallback;

        return this;
    }
}

export default class Ajax {
    static json(url, method = 'GET', timeout = 4000) {
        const requestMethods = ['GET', 'POST', 'PUT', 'OPTIONS',];
        if (typeof url !== 'string') {
            throw new TypeError('Argument "url" must be of type string');
        }
        if (typeof method !== 'string') {
            throw new TypeError('Argument "method" must be of type string');
        }
        if (requestMethods.indexOf(method) === -1) {
            throw new TypeError('Argument "method" must be one of "' + requestMethods.join('", "') + '"');
        }

        const request = new XMLHttpRequest();
        request.open(method, url, true);
        request.setRequestHeader('Content-Type', 'application/javascript');

        let promise = new Promise(request, timeout, {
            "url": url,
            "method": method
        });
        request.send();

        return promise;
    }
}