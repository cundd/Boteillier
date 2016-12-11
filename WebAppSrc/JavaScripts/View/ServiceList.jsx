import React from 'react';
import Service from './Service.jsx';

export default class ServiceList extends React.Component {
    constructor() {
        super();
        this.state = {
            services: [],
            activeService: {}
        };
    }

    render() {
        const services = this.state.services;
        const activeService = this.state.activeService;
        if (!services || services.length === 0) {
            return <div className="service-list"></div>;
        }

        const onServiceClick = this.props.onServiceClick;

        const servicesElements = services.map(function (service, url) {
            let classNames = '';
            if (service.hostName === activeService.hostName) {
                classNames = 'active'
            }

            return <li key={url} className={classNames}><Service service={service} onClick={onServiceClick}/></li>
        });

        return <div className="service-list-container">
            <h1>Services:</h1>
            <ul className="service-list">{servicesElements}</ul>
        </div>
    }
}
