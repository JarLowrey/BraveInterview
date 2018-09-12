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
      <form noValidate autoComplete="off" onSubmit={this.handleSearchFormSubmit} style={{ display: 'flex', }}>
        <TextField
          disabled={this.props.disabled}
          autoFocus
          id="swapi-search"
          label="ID or Search Term"
          fullWidth
          style={{ flexGrow: 1000 }}
          value={this.props.searchTerm}
          onChange={this.props.handleSearchChange}
          margin="normal"
        />

        <FormControl
          disabled={this.props.disabled}
          style={{ verticalAlign: 'bottom', marginRight: '15px', minWidth: '150px', flexGrow: 0 }}
          margin="normal">
          <InputLabel htmlFor="resource-search-type--id">Resource</InputLabel>
          <Select
            value={this.props.resource}
            onChange={this.props.handleResourceChange}
            input={<Input name="resource-search-type" id="resource-search-type--id" />}
          >
            <MenuItem value="people">People</MenuItem>
            <MenuItem value="films">Films</MenuItem>
            <MenuItem value="starships">Starships</MenuItem>
            <MenuItem value="vehicles">Vehicles</MenuItem>
            <MenuItem value="species">Species</MenuItem>
            <MenuItem value="planets">Planets</MenuItem>
          </Select>
        </FormControl>

        <div style={{ flexGrow: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Button
              disabled={this.props.disabled}
              color="primary" variant="contained" onClick={this.handleSearchFormSubmit}>
              submit
          </Button>
          </div>
        </div>
      </form>
    );
  }
}
