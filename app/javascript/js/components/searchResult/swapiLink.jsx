import React, { Component } from "react";

import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

export default class SwapiLink extends Component {
    constructor(props) {
        super(props)
        this.search = this.search.bind(this);
    }

    search(resource, id) {
        return () => {
            this.props.performSearch(resource, id);
        }
    }

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
                component={Link}
                to={'/?' + this.props.getUrlSearchParams(resource, id)}
                onClick={this.search(resource, id)}
            >
                {`${resource}-${id}`}
            </Button>
        );

    }
}
