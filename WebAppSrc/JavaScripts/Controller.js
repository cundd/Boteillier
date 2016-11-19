/**
 * Created by daniel on 22.10.16.
 */
import _ from './../node_modules/underscore/underscore';
import RemoteService from './RemoteService';

export default class Controller {
    constructor() {
        this.controls = _.map(document.querySelectorAll('[data-action]'));

        this.keyMap = {
            "play-pause": "space",
            "forward": "right",
            "back": "left"
        };
    }

    addEventListeners() {
        let _click = this.click.bind(this);
        console.log(this.controls);

        this.controls.forEach(function (control) {
            control.addEventListener('click', function (event) {
                _click(event, this)
            });
        });
    }

    click(event, element) {
        const action = element.dataset.action;
        console.log(element.dataset.action, this);
        RemoteService.send(this.keyMap[action]);
    }
}