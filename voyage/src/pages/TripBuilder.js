import React, { Component } from "react";
import Navbar from "./navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDraftingCompass,
  faFeatherAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./styles/trips.css";

class TripBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      tripName: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  isValidCredentials(name, email, trip) {
    if (
      name.localeCompare("") === 0 ||
      email.localeCompare("") === 0 ||
      trip.localeCompare("") === 0
    ) {
      return false;
    }
    return this.validateEmail(email);
  }

  handleSubmit(event) {
    // event.preventDefault();
    var name = event.target.name.value;
    var email = event.target.email.value;
    var tripName = event.target.tripName.value;
    this.setState({
      name: name,
      email: email,
      tripName: tripName,
    });
    // href={`/creation?name=${this.state.name}&email=${this.state.email}&tripName=${this.state.tripName}`}

    var isValid = this.isValidCredentials(name, email, tripName);

    if (isValid) {
      this.props.history.push(
        `/creation?name=${name}&email=${email}&tripName=${tripName}`
      );
    } else {
      window.alert("Unfit Credentials.");
      this.props.history.push("/tripbuilder");
    }
  }
  render() {
    return (
      <div className="tripbuilder-bg">
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
        ></link> */}

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <script src="https://kit.fontawesome.com/a076d05399.js"></script>
        <div>
          <Navbar items={["u", "active", "u", "u"]}></Navbar>
          <div>
            <div class="row">
              <div className="column-trip">
                <FontAwesomeIcon
                  className="route-icon route-icon-color"
                  icon={faDraftingCompass}
                />
              </div>
              <div className="column-trip">
                <body className="background-trips-body">
                  <div className="trip-form">
                    <form className="form-layer" onSubmit={this.handleSubmit}>
                      <div align="center">
                        <FontAwesomeIcon
                          className="feather-icon"
                          icon={faFeatherAlt}
                        />
                      </div>
                      <div align="center">
                        <h1 className="createTrip-title">Create a Trip</h1>
                      </div>
                      <label className="labels" for="tripName">
                        Trip Name
                      </label>
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          id="tripName"
                          aria-describedby="theTripName"
                          placeholder="Enter trip name"
                          value={this.state.tripName}
                        />
                      </div>
                      <label className="labels" for="name">
                        Name
                      </label>
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          id="name"
                          aria-describedby="theName"
                          placeholder="Enter name"
                          value={this.state.name}
                        />
                      </div>
                      <label className="labels" for="exampleInputEmail1">
                        Email address
                      </label>
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control"
                          id="email"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                          value={this.state.email}
                        />
                      </div>
                      <input
                        class="btn btn-primary"
                        type="submit"
                        value="Submit"
                      />
                    </form>
                  </div>
                </body>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TripBuilder;
