import React from 'react';
import ReactDOM from 'react-dom';
import ServiceList from './View/ServiceList.jsx';

/**
 * Created by daniel on 22.10.16.
 */
export default class App {
    constructor() {
        /** @type {Controller} */
        this.controller = {};
        /** @type {ServiceScanner} */
        this.serviceScanner = {};
        /** @type {Store} */
        this.store = {};
    }

    static needs() {
        return ['controller', 'serviceScanner', 'store'];
    }

    run(reactRoot) {
        this.controller.addEventListeners();
        this.serviceScanner.findServices();

        const onServiceClick = function (service) {
            console.debug('Activate service', service);
            this.store.setActiveService(service);

            document.getElementById('button-group').style.display = 'block';
        }.bind(this);

        const root = ReactDOM.render(<ServiceList onServiceClick={onServiceClick}/>, reactRoot);

        this.store.registerComponent(root);
    }
}

