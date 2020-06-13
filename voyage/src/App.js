import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import LearnMore from "./pages/LearnMore";
import TripBuilder from "./pages/TripBuilder";
import Calendar from "./pages/Calendar";
import Events from "./pages/Events";
import Creation from "./pages/Creation";

import "./App.css";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/learnmore" component={LearnMore} />
            <Route exact path="/tripbuilder" component={TripBuilder} />
            <Route exact path="/calendar" component={Calendar} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/creation" component={Creation} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
