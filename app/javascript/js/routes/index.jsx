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
    this.checkUrlAndSearchIfNeeded = this.checkUrlAndSearchIfNeeded.bind(this);
  }

  static getUrlSearchParams(resource, searchTerm) {
    let search = new URLSearchParams();
    search.set('resource', resource);
    search.set('search', searchTerm);
    return search.toString();
  }

  componentDidMount(){
    //search on initial load
    this.checkUrlAndSearchIfNeeded();
  }

  checkUrlAndSearchIfNeeded(search = this.props.location.search){
    search = new URLSearchParams(search);
    const r = search.get('resource');
    const s = search.get('search');
    if (r && s) {
      this.performSearch(r, s);
    }
  }

  handleSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  handleResourceChange(event) {
    this.setState({ resource: event.target.value });
  }

  async performSearch(resource = this.state.resource, searchTerm = this.state.searchTerm, updateUrl = true) {
    //make shareable - modify URL
    const urlParams = new URLSearchParams(this.props.location.search);
    if (updateUrl && urlParams.get('resource') !== resource || urlParams.get('search') !== searchTerm) {
      this.props.history.push('?'+Index.getUrlSearchParams(resource, searchTerm)); 
    }

    this.setState({ searchResults: null, resource: resource, searchTerm: searchTerm, hasSearched: true, isLoading: true });

    const searchURL = '/search/' + resource + '/' + searchTerm;
    let response = await fetch(searchURL);
    let searchData = await response.json();
    console.log(searchData);

    this.setState({ searchResults: searchData, isLoading: false });
  }

  async doSearch(r,s){
    
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
            search={this.performSearch}
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
