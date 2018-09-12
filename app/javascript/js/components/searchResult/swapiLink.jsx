import React, { Component } from "react";

import Button from '@material-ui/core/Button';

export default class SwapiLink extends Component {
    static getResourceFromSwapiUrl(url) {
        const urlSegments = url.split('/');
        return urlSegments[urlSegments.length - 3];
    }
    static getIdFromSwapiUrl(url) {
        const urlSegments = url.split('/');
        return urlSegments[urlSegments.length - 2];
    }
    render() {
        const id = SwapiLink.getIdFromSwapiUrl(this.props.url);
        const resource = SwapiLink.getResourceFromSwapiUrl(this.props.url);

        return (
            <Button
                style={{ margin: '3px' }}
                color="primary"
                variant="contained"
                href={'/' + this.props.getUrlSearchParams(resource, id)}
            >
                {`${resource}-${id}`}
            </Button>
        );

    }
}
