/**
 * Created by daniel on 22.10.16.
 */
export default class App {
    constructor() {
        /** @type Controller */
        this.controller = {};
    }

    static needs() {
        return ['controller', 'serviceScanner'];
    }

    run() {
        this.controller.addEventListeners();
        this.serviceScanner.findServices((serviceUrl) => {
            console.log(serviceUrl)
        });
    }
}

