import React, { Component } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import axios from "axios";
import "./styles/bored.css";

let arr = [];

const zomato_key = "a709f309de1a20ac8da79907af27d37c";
class Bored extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
    };
  }

  createRestaurants = async (data) => {
    console.log(data);
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
  }

  renderRestaurants() {
    let res = [];
    for (var i = 0; i < 10; i++) {
      res.push(
        // <div class="card" style="width: 18rem;">
        <div class="card-b">
          <img class="card-img-top" src="..." alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" class="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      );
    }
    return res;
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
                {"  "}
                {this.state.restaurants}
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
