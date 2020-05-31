import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Main from "./pages/Main";
import Footer from "./pages/footer";
import LearnMore from "./pages/LearnMore";
import Trips from "./pages/Trips";
import Calendar from "./pages/Calendar";
import Events from "./pages/Events";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/learnmore" component={LearnMore} />
            <Route exact path="/trips" component={Trips} />
            <Route exact path="/calendar" component={Calendar} />
            <Route exact path="/events" component={Events} />
          </Switch>
        </Router>
        {/* <Footer />  Add back later */}
      </div>
    );
  }
}

export default App;
