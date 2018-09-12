import React, { Component } from "react";

import CircularProgress from '@material-ui/core/CircularProgress';

import SearchForm from '../components/searchForm';
import SearchResult from '../components/searchResult';

export default class Index extends Component {
  state = {
    searchResults: [],
    resource: 'people',
    searchTerm: 'Luke Skywalker',
    hasSearched: false,
    isLoading: false
  }

  constructor(props) {
    super(props);
    this.performSearch = this.performSearch.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleResourceChange = this.handleResourceChange.bind(this);
    this.setStateFromUrlAndRunSearch = this.setStateFromUrlAndRunSearch.bind(this);
    this.setSearchUrl = this.setSearchUrl.bind(this);
  }

  static getUrlSearchParams(resource, searchTerm) {
    let url = new URL(document.location.href);
    url.searchParams.set('resource', resource);
    url.searchParams.set('search', searchTerm);
    return url.search;
  }

  componentDidMount() {
    this.setStateFromUrlAndRunSearch();
  }

  async setStateFromUrlAndRunSearch() {
    let url = new URL(document.location.href);
    const resource = url.searchParams.get('resource');
    const searchTerm = url.searchParams.get('search');

    // set state using the URL search terms, then run a search  
    if (resource && searchTerm) {
      this.setState({ resource: resource });
      this.setState({ searchTerm: searchTerm });

      this.performSearch(resource, searchTerm);
    }
  }

  //make shareable - modify URL
  setSearchUrl(resource = this.state.resource, searchTerm = this.state.searchTerm) {
    this.props.history.push(Index.getUrlSearchParams(resource, searchTerm));
  }

  handleSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  handleResourceChange(event) {
    this.setState({ resource: event.target.value });
  }

  async performSearch(resource = this.state.resource, searchTerm = this.state.searchTerm) {
    this.setSearchUrl(resource, searchTerm);

    this.setState({ hasSearched: true, isLoading: true });

    const searchURL = '/search/' + resource + '/' + searchTerm;
    let response = await fetch(searchURL);
    let searchData = await response.json();
    console.log(searchData);

    this.setState({ searchResults: searchData, isLoading: false })
  }

  render() {
    let content = null;

    if (this.state.isLoading) {
      content = (
        <div style={{
          position: 'absolute', left: '50%', top: '0',
          transform: 'translate(-50%, 50%)'
        }}>
          <CircularProgress size={50} />
        </div>
      );
    } else if (this.state.searchResults && this.state.searchResults.length > 0) {
      content = this.state.searchResults.map((searchResult) => {
        return (
          <SearchResult
            key={searchResult.url}
            getUrlSearchParams={Index.getUrlSearchParams}
            resultObject={searchResult}
          />
        );
      }, []);
    } else if (this.state.hasSearched) {
      content = 'Search returned no results';
    }

    return (
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <SearchForm
          disabled={this.state.isLoading}
          handleSearchChange={this.handleSearchChange}
          handleResourceChange={this.handleResourceChange}
          resource={this.state.resource}
          searchTerm={this.state.searchTerm}
          handleSearchFormSubmit={this.performSearch}
        />
        {content}
      </div>
    );
  }
}
