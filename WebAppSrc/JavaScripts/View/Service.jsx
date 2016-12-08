import React from 'react';

export default class Service extends React.Component {
    render() {
        const service = this.props.service;
        const onClick = function (proxy, event) {
            this.props.onClick(service, event, proxy)
        }.bind(this);

        return <a className="service" onClick={onClick}>{service.hostName}</a>
    }
}
