import React, { Component } from "react";

import SearchForm from '../components/searchForm';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);

    this.state = {

    }
  }

  async handleSearchFormSubmit(type, searchTerm) {
    const searchURL = '/search/'+type+'/'+searchTerm;
    console.log(searchURL)
    let response = await fetch(searchURL);
    let searchData = await response.json();
    console.log(searchData)
  }

  render() {
    return (
      <div>
        <SearchForm
          handleSearchFormSubmit={this.handleSearchFormSubmit}
        />
      </div>
    );
  }
}
