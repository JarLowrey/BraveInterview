import React, { Component } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Index from "./routes/index";
import NotFoundPage from "./routes/notFoundPage";

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={createMuiTheme()}>
        <Router>
          <Switch>
          <Route exact path="/" component={Index} />
          <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}
