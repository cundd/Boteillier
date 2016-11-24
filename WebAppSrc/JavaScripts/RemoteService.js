/**
 * Created by daniel on 22.10.16.
 */

export default class RemoteService {
    /**
     *
     * @param {string} key
     * @param {function} [onSuccess]
     * @param {function} [onError]
     */
    static send(key, onSuccess, onError) {
        RemoteService._request(
            '/api/' + key + '',
            'GET',
            (data) => {
                console.log(data);
                if (onSuccess) {
                    onSuccess(data, request);
                }
            },
            (request) => {
                console.log(request);
                if (onSuccess) {
                    onError(request);
                }
            }
        )
    }

    /**
     *
     * @param {string} url
     * @param {string} method
     * @param {function} success
     * @param {function} error
     * @private
     */
    static _request(url, method, success, error) {
        const request = new XMLHttpRequest();
        request.open(method, url, true);
        request.setRequestHeader('Content-Type', 'application/javascript');

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                try {
                    var data = JSON.parse(request.responseText);
                    success(data, request);
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
            console.log('onerror', arguments);

            error(request);
        };

        request.send();
    }
}
