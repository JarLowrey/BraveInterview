import React, { Component } from "react";

import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

export default class NotFoundPage extends Component {
  render() {
    return (
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%,-50%)", textAlign: 'center' }}>
        <p>
          There doesn't seem to be anything here.
        </p>
        <Button
          color="primary" variant="contained"
          component={Link}
          to="/"
        >
          Home
          </Button>
      </div>
    );
  }
}
