/**
 * Created by daniel on 22.10.16.
 */
import _ from './../node_modules/underscore/underscore';
import RemoteService from './RemoteService';

export default class Controller {
    constructor() {
        /** @type {Store} */
        this.store = {};
        this.controls = _.map(document.querySelectorAll('[data-action]'));

        this.keyMap = {
            "play-pause": "space",
            "forward": "right",
            "back": "left"
        };
    }

    static needs() {
        return ['store'];
    }

    addEventListeners() {
        let _click = this.click.bind(this);

        this.controls.forEach(function (control) {
            control.addEventListener('click', function (event) {
                _click(event, this)
            });
        });
    }

    click(event, element) {
        const action = element.dataset.action;
        const messageOutlet = document.querySelector('[data-outlet="message"]');

        RemoteService.send(this.store.getActiveService(), this.keyMap[action], () => {}, function (request) {
            if (messageOutlet) {
                messageOutlet.innerText = 'Error: ' + request.statusText;
            }
        });
    }
}