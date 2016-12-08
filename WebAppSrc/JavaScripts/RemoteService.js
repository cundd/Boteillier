/**
 * Created by daniel on 22.10.16.
 */
const EF = () => {
};

export default class RemoteService {
    /**
     * Sends the key stroke
     *
     * @param {Service} service
     * @param {string} key
     * @param {function} [onSuccess]
     * @param {function} [onError]
     */
    static send(service, key, onSuccess = EF, onError = EF) {
        RemoteService._request(
            service.url + '/api/' + key + '',
            'GET',
            onSuccess,
            onError
        )
    }

    /**
     * Make an AJAX request
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

        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                let data;
                try {
                    data = JSON.parse(request.responseText);
                } catch (exception) {
                    error(request, {
                        "exception": exception
                    });
                    return;
                }
                success(data, request);
            } else {
                error(request);
            }
        };

        request.onerror = () => {
            error(request);
        };

        request.send();
    }
}
