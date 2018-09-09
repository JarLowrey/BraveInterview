import React, { Component } from "react";

import TextField from '@material-ui/core/TextField';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);

    this.state = {
      search: "Luke Skywalker",
      type: "people"
    }
  }

  handleSearchChange(event) {
    this.setState({ search: event.target.value });
  }
  handleTypeChange(event) {
    this.setState({ type: event.target.value });
  }
  handleSearchFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    this.props.handleSearchFormSubmit(this.state.type, this.state.search);
  }

  render() {
    return (
      <form noValidate autoComplete="off" onSubmit={this.handleSearchFormSubmit}>
        <span>Search </span>
        <FormControl
          style={{ verticalAlign: 'bottom' }}
          margin="normal">
          <InputLabel htmlFor="resource-search-type--id">Resource</InputLabel>
          <Select
            value={this.state.type}
            style={{ minWidth: '150px' }}
            onChange={this.handleTypeChange}
            input={<Input name="resource-search-type" id="resource-search-type--id" />}
          >
            <MenuItem value="people">People</MenuItem>
            <MenuItem value="films">Films</MenuItem>
            <MenuItem value="starships">Starships</MenuItem>
            <MenuItem value="species">Species</MenuItem>
            <MenuItem value="planets">Planets</MenuItem>
          </Select>
        </FormControl>

        <span> for </span>

        <TextField
          id="swapi-search"
          label="Search Term"
          value={this.state.search}
          onChange={this.handleSearchChange}
          margin="normal"
        />
      </form>
    );
  }
}
