import React, { Component } from "react";

import SearchForm from '../components/searchForm';

import CircularProgress from '@material-ui/core/CircularProgress';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleResourceChange = this.handleResourceChange.bind(this);

    this.state = {
      swapiObjects: [],
      resource: 'people',
      searchTerm: 'Luke Skywalker',
      isLoading: false
    }
  }
  handleSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  handleResourceChange(event) {
    this.setState({ resource: event.target.value });
  }


  async handleSearchFormSubmit() {
    this.setState({ isLoading: true });

    const searchURL = '/search/' + this.state.resource + '/' + this.state.searchTerm;
    let response = await fetch(searchURL);
    let searchData = await response.json();
    console.log(searchData);

    this.setState({ isLoading: false });
    this.setState({ swapiObjects: searchData })
  }

  render() {
    if (this.state.isLoading) {
      return (<
        div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
        <CircularProgress size={50} />
      </div>);
    }

    return (
      <div style={{ position: 'relative' }}>
        <SearchForm
          handleSearchChange={this.handleSearchChange}
          handleResourceChange={this.handleResourceChange}
          resource={this.state.resource}
          searchTerm={this.state.searchTerm}
          handleSearchFormSubmit={this.handleSearchFormSubmit}
        />
      </div>
    );
  }
}
