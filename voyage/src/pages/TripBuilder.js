import React, { Component } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDraftingCompass,
  faFeatherAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./styles/trips.css";

class TripBuilder extends Component {
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
                  className="route-icon"
                  icon={faDraftingCompass}
                />
              </div>
              <div className="column-trip">
                <body className="background-trips-body">
                  <div className="trip-form">
                    <form className="form-layer">
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
                        />
                      </div>
                      <label className="labels" for="name">
                        Name
                      </label>
                      <div class="form-group">
                        {/* <label className="labels" for="name">
                          Name
                        </label> */}
                        <input
                          type="text"
                          class="form-control"
                          id="name"
                          aria-describedby="theName"
                          placeholder="Enter name"
                        />
                      </div>
                      <label className="labels" for="exampleInputEmail1">
                        Email address
                      </label>
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                        />
                      </div>

                      <button type="submit" class="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  </div>
                </body>
              </div>
            </div>
          </div>
        </div>

        {/* <Footer /> */}
      </div>
    );
  }
}

export default TripBuilder;
