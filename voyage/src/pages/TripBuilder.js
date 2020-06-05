import React, { Component } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoute, faFeatherAlt } from "@fortawesome/free-solid-svg-icons";
import "./styles/trips.css";

class TripBuilder extends Component {
  render() {
    return (
      <div className="tripbuilder-bg">
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
        ></link>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <script src="https://kit.fontawesome.com/a076d05399.js"></script>
        <div>
          <Navbar items={["u", "active", "u", "u"]}></Navbar>
          <div class="row">
            <div class="column-tr-1">
              <FontAwesomeIcon className="route-icon" icon={faRoute} />
            </div>
            <div class="column-tr-2">
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
                    <div class="form-group">
                      <label className="labels" for="tripName">
                        Trip Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="tripName"
                        aria-describedby="theTripName"
                        placeholder="Enter trip name"
                      />
                    </div>
                    <div class="form-group">
                      <label className="labels" for="name">
                        Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        aria-describedby="theName"
                        placeholder="Enter name"
                      />
                    </div>
                    <div class="form-group">
                      <label className="labels" for="exampleInputEmail1">
                        Email address
                      </label>
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

        <Footer />
      </div>
    );
  }
}

export default TripBuilder;
