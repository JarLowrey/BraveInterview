import React, { Component } from "react";

import Button from '@material-ui/core/Button';

export default class SearchResult extends Component {
    static getResourceFromSwapiUrl(url) {
        const urlSegments = url.split('/');
        return urlSegments[urlSegments.length - 3];
    }
    static getIdFromSwapiUrl(url) {
        const urlSegments = url.split('/');
        return urlSegments[urlSegments.length - 2];
    }
    static processKeyString(key) {
        key = key.replace("_", " ");
        key = key.split(' ') //To title case
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        return key;
    }

    render() {
        if (!this.props.resultObject) {
            return null;
        }

        let content = Object.keys(this.props.resultObject).map((key) => {
            let value = this.props.resultObject[key];
            let returnVal = null;

            //value may be an array represented by a string. Try to parse it to find out
            try {
                value = JSON.parse(value);
            } catch (err) { }

            if (Array.isArray(value)) {
                value = value.slice(); //copy the array from props so you can write to it
                for (let i = 0; i < value.length; i++) {
                    const url = value[i];
                    const id = SearchResult.getIdFromSwapiUrl(url);
                    const resource = SearchResult.getResourceFromSwapiUrl(url);

                    value[i] = (
                        <Button
                            style={{ margin: '3px' }}
                            color="primary"
                            variant="contained"
                            key={value[i]}
                            href={'/' + this.props.getUrlSearchParams(resource, id)}
                        >
                            {`${resource}-${id}`}
                        </Button>
                    );
                }
            } else {
                value = <span>{value}</span>
            }

            return (
                <div style={{ verticalAlign: 'top', padding: '10px', display: 'inline-block', maxWidth: '550px' }} key={key}>
                    <h4>{SearchResult.processKeyString(key)}</h4>
                    {value}
                </div>
            );
        }, []);

        return (
            <div style={{margin: '0 auto', width: '80%'}}>
                {content}
            </div>
        );
    }
}
