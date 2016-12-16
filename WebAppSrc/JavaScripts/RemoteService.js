/**
 * Created by daniel on 22.10.16.
 */
import Ajax from './Ajax';
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
        Ajax.json(url, method).then(success).else(error)
    }
}
