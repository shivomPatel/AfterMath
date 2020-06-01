import React, { Component } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import Searchbar from "./searchbar";
import "./styles/bored.css";

class Bored extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      long: null,
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) =>
      this.setState({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      })
    );

    let requestURL = "https://www.trackcorona.live/api/countries";
    let request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType = "json";
    request.send();
    request.onload = function () {
      console.log(request);
    };
  }
  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
        ></link>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <script src="https://kit.fontawesome.com/a076d05399.js"></script>
        <div className="background">
          <Navbar items={["u", "u", "u", "u", "active"]}></Navbar>
          <div class="row-b">
            <div class="column-b">
              <h2>Food</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
            <div class="column-b">
              <h2>Activity</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
            <div class="column-b">
              <h2>Sports</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Bored;
