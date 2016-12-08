/**
 * Created by daniel on 08.12.16.
 */
import IrLib from './../node_modules/irlib/dist/irlib';
import Service from './Model/Service';

export default class Store {

    constructor() {
        /**
         * @type {{}}
         * @private
         */
        this._state = {};

        /**
         * @type {Array}
         * @private
         */
        this._history = [];

        /**
         * @type {Array}
         * @private
         */
        this._components = [];
    }

    /**
     * Add a component to receive state updates
     *
     * @param {React.Component} component
     * @returns {Store}
     */
    registerComponent(component) {
        this._components.push(component);

        return this;
    }

    /**
     * Set the new state and inform the components
     *
     * @param {{}} newState
     */
    set state(newState) {
        this._history.push(newState);
        this._state = newState;

        this._components.forEach(function (component) {
            component.setState(newState)
        });
    }

    /**
     * Returns the current state
     *
     * @returns {{}}
     */
    get state() {
        return this._state;
    }

    /**
     * Updates the state
     *
     * @param {*} changedState
     * @returns {Store}
     */
    updateState(changedState) {
        this.state = Object.assign({}, this._state, changedState);

        return this;
    }

    /**
     * Add a services URL
     *
     * @param {string} url
     * @param {{}} serviceData
     * @returns {Store}
     */
    addService(url, serviceData) {
        console.debug('Add service ' + url);
        const oldState = this.state;
        const oldServices = oldState.services;

        const newServices = {};
        newServices[url] = new Service(serviceData.url, serviceData.hostName, serviceData.ip);

        const services = new IrLib.Dictionary(Object.assign({}, oldServices, newServices));
        this.state = Object.assign({}, oldServices, {services: services});

        return this;
    }

    /**
     * Returns the active service
     *
     * @returns {Service}
     */
    getActiveService() {
        return this.state.activeService;
    }

    /**
     * Returns the active service
     *
     * @param {Service} service
     * @returns {Store}
     */
    setActiveService(service) {
        return this.updateState({activeService: service});
    }
}
