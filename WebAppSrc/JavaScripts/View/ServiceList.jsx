import React from 'react';
import Service from './Service.jsx';

export default class ServiceList extends React.Component {
    constructor() {
        super();
        this.state = {services: []};
    }

    render() {
        const services = this.state.services;
        if (!services || services.length === 0) {
            return <div className="service-list"></div>;
        }

        const onServiceClick = this.props.onServiceClick;

        const servicesElements = services.map(function (service, url) {
            return <li key={url}><Service service={service} onClick={onServiceClick}/></li>
        });
        return <div className="service-list-container">
            <h1>Services:</h1>
            <ul className="service-list">{servicesElements}</ul>
        </div>
    }
}
