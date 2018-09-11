import React, { Component } from "react";

import TextField from '@material-ui/core/TextField';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);
  }

  handleSearchFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    this.props.handleSearchFormSubmit();
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
            value={this.props.resource}
            style={{ minWidth: '150px' }}
            onChange={this.props.handleResourceChange}
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
          autoFocus
          id="swapi-search"
          label="Search Term"
          value={this.props.searchTerm}
          onChange={this.props.handleSearchChange}
          margin="normal"
        />

        <Button color="primary" variant="contained" onClick={this.handleSearchFormSubmit}>
          submit
        </Button>
      </form>
    );
  }
}
