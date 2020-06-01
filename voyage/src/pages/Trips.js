import React, { Component } from "react";
import "./styles/trips.css";
import Navbar from "./navbar";
import Footer from "./footer";
class Trips extends Component {
  render() {
    return (
      <div className="background">
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
          <Navbar items={["u", "active", "u", "u", "u"]}></Navbar>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Trips;
