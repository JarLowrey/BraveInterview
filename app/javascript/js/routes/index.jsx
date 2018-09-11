import React, { Component } from "react";

import SearchForm from '../components/searchForm';

import CircularProgress from '@material-ui/core/CircularProgress';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleResourceChange = this.handleResourceChange.bind(this);
    this.runDefaultSearchFromUrl = this.runDefaultSearchFromUrl.bind(this);
    this.setUrlFromState = this.setUrlFromState.bind(this);

    this.state = {
      swapiObjects: [],
      resource: 'people',
      searchTerm: 'Luke Skywalker',
      isLoading: false
    }
  }

  componentDidMount(){
    this.runDefaultSearchFromUrl();
  }

  async runDefaultSearchFromUrl() {
    let url = new URL(document.location.href);
    const resource = url.searchParams.get('resource');
    const searchTerm = url.searchParams.get('search');

    // set state using the URL search terms, then run a search
    if (resource && searchTerm) {
      const resourceStateChange = this.setState({ resource: resource });
      const searchStateChange = this.setState({ searchTerm: searchTerm });
      await Promise.all([resourceStateChange, searchStateChange]);

      this.handleSearchFormSubmit();
    }
  }

  //make shareable - modify URL
  setUrlFromState() {
    let url = new URL(document.location.href);
    url.searchParams.set('resource', this.state.resource);
    url.searchParams.set('search', this.state.searchTerm);
    this.props.history.push(url.search);
  }

  handleSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  handleResourceChange(event) {
    this.setState({ resource: event.target.value });
  }

  async handleSearchFormSubmit() {
    this.setState({ isLoading: true });
    this.setUrlFromState();

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
