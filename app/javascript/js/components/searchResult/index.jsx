import React, { Component } from "react";

import SwapiLink from './swapiLink';

export default class SearchResult extends Component {
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
                    value[i] = (<SwapiLink key={value[i]} getUrlSearchParams={this.props.getUrlSearchParams} url={value[i]} />);
                }
            } else if (key === 'url') {
                value = (<SwapiLink getUrlSearchParams={this.props.getUrlSearchParams} url={value} />);
            } else {
                value = (<span>{value}</span>);
            }

            return (
                <div style={{ verticalAlign: 'top', padding: '10px', display: 'inline-block', maxWidth: '550px' }} key={key}>
                    <h4>{SearchResult.processKeyString(key)}</h4>
                    {value}
                </div>
            );
        }, []);

        return (
            <div style={{ margin: '0 auto', width: '80%' }}>
                {content}
            </div>
        );
    }
}
