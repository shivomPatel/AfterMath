import React, { Component } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import axios from "axios";
import "./styles/bored.css";

const seat_geek_client_id = "MjEyMDE0MTh8MTU5MTE0NjEzMy45Nw";

const zomato_key = "a709f309de1a20ac8da79907af27d37c";
class Bored extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      activities: [],
    };
  }

  createRestaurants = async (data) => {
    let res = [];
    for (var i = 0; i < data.nearby_restaurants.length; i++) {
      res.push(
        <div class="card-b">
          <div class="card-body">
            <h4>{data.nearby_restaurants[i].restaurant.name}</h4>
            <h6>{data.nearby_restaurants[i].restaurant.cuisines}</h6>
            <p class="card-text">
              <span className="rating">Rating: </span>
              {
                data.nearby_restaurants[i].restaurant.user_rating
                  .aggregate_rating
              }
              /5.0
            </p>
            <a
              href={data.nearby_restaurants[i].restaurant.url}
              class="btn btn-primary"
            >
              Visit Website
            </a>
            <a
              href={data.nearby_restaurants[i].restaurant.menu_url}
              class="btn b2"
            >
              Menu
            </a>
          </div>
        </div>
      );
    }
    this.setState({
      restaurants: res,
    });
  };

  formatDate(event) {
    let date = new Date(event.datetime_local);
    let f_date = date.toLocaleTimeString();
    let date_substr =
      f_date.substring(0, f_date.lastIndexOf(":")) +
      " " +
      f_date.substring(f_date.length - 2);
    return date_substr;
  }

  getEvents = async () => {
    const response = await axios({
      method: "GET",
      url: `https://api.seatgeek.com/2/events?geoip=true&range=12mi&client_id=${seat_geek_client_id}`,
    });
    console.log(response.data.events);
    let res = [];
    for (var i = 0; i < response.data.events.length; i++) {
      let event = response.data.events[i];
      let taxes = [];
      let date = new Date(event.datetime_local);
      let time_of_event = this.formatDate(event);
      for (var j = 0; j < event.taxonomies.length; j++) {
        taxes.push(<span className="types">{event.taxonomies[j].name} </span>);
      }
      res.push(
        <div class="card-b">
          <div class="card-body">
            <h4 className="event-title">{event.title}</h4>
            <h5 className="event-taxes">
              <span>Type: </span>
              {taxes}
            </h5>
            <h5 className="event-taxes">
              <span>
                Open:{" "}
                {event.is_open ? (
                  <span className="open">Yes</span>
                ) : (
                  <span className="closed">No</span>
                )}
              </span>
            </h5>
            <p className="event-location">
              {event.venue.address}, {event.venue.display_location}
            </p>
            <a href={event.url} class="btn btn-primary">
              Visit Website
            </a>
            <span className="event-date">
              {date.toDateString()} - {time_of_event}
            </span>
          </div>
        </div>
      );
    }
    this.setState({
      activities: res,
    });
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      const response = await axios({
        method: "GET",
        url: `https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lng}`,
        headers: {
          "user-key": zomato_key,
          "content-type": "application/json",
        },
      });
      this.createRestaurants(response.data);
    });
    this.getEvents();
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
        <div className="backgroun">
          <Navbar items={["u", "u", "u", "u", "active"]}></Navbar>
          <div class="row-b">
            <div class="column-b">
              <h2 className="column-title">Food</h2>
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
                {"  "}
                {this.state.restaurants}
              </p>
            </div>
            <div class="column-b-2">
              <h2 className="column-title">Activity</h2>
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
                {"  "}
                {this.state.activities}
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
