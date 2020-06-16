import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Footer from "./footer";
import Navbar from "./navbar";
import Tabs from "./Tabs";
import { GoogleApiWrapper } from "google-maps-react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import AddTodo from "./containers/AddTodo";
import VisibleTodoList from "./containers/VisibleTodoList";
import rootReducer from "./reducers";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMapMarkerAlt,
  faHamburger,
  faInfoCircle,
  faPlane,
  faCalendarAlt,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import "./styles/creationmap.css";
import "./styles/creation.css";

const store = createStore(rootReducer);
const seat_geek_client_id = "MjEyMDE0MTh8MTU5MTE0NjEzMy45Nw";
const zomato_key = "a709f309de1a20ac8da79907af27d37c";

class Creation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      newLocations: [],
      locations: [
        { name: "Atlanta", location: { lat: 33.774483, lng: -84.382849 } },
        { name: "Belize", location: { lat: 17.490481, lng: -88.202213 } },
        { name: "Cancun", location: { lat: 21.165197, lng: -86.827264 } },
        {
          name: "Cape Canaveral",
          location: { lat: 28.392157, lng: -80.596978 },
        },
        { name: "Costa Maya", location: { lat: 18.735196, lng: -87.691022 } },
        { name: "Cozumel", location: { lat: 20.508578, lng: -86.947737 } },
        { name: "Dallas", location: { lat: 32.838814, lng: -96.786518 } },
        { name: "Grand Turk", location: { lat: 21.428566, lng: -71.143985 } },
        {
          name: "Green Cove Springs",
          location: { lat: 29.991212, lng: -81.689631 },
        },
        { name: "Jacksonville", location: { lat: 30.274438, lng: -81.388347 } },
        { name: "Miami", location: { lat: 25.774763, lng: -80.130467 } },
        { name: "Nassau", location: { lat: 25.078643, lng: -77.338089 } },
        { name: "New York", location: { lat: 40.736701, lng: -73.989334 } },
        { name: "Nocatee", location: { lat: 30.104096, lng: -81.430318 } },
        { name: "Orlando", location: { lat: 28.546863, lng: -81.373917 } },
        { name: "Roatan", location: { lat: 16.357849, lng: -86.442765 } },
        {
          name: "Saint-Martin",
          location: { lat: 18.0308266, lng: -63.0736329 },
        },
        { name: "St Augustine", location: { lat: 29.906616, lng: -81.314784 } },
        { name: "St Thomas", location: { lat: 18.339866, lng: -64.9249165 } },
        {
          name: "Washington D.C.",
          location: { lat: 38.89027, lng: -77.008907 },
        },
      ],
      markers: [],
      infowindow: new this.props.google.maps.InfoWindow(),
      map: null,
      bounds: null,
      add_place: null,
      nearby_places: [],
      restaurants: [],
    };
  }

  updateName = (name) => {
    this.setState({
      name: name,
    });
  };

  componentDidMount() {
    this.loadMap();
    this.onclickLocation();
  }

  loadMap() {
    if (this.props && this.props.google) {
      const that = this;
      const { google } = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      const mapConfig = Object.assign(
        {},
        {
          mapTypeId: "roadmap",
        }
      );
      const map = new maps.Map(node, mapConfig);
      const input = document.getElementById("search-input");
      const autocomplete = new google.maps.places.Autocomplete(input);
      const { infowindow } = this.state;
      const bounds = new maps.LatLngBounds();

      let markers = [];
      this.state.locations.map((location) => {
        const marker = new google.maps.Marker({
          position: { lat: location.location.lat, lng: location.location.lng },
          map: map,
          title: location.name,
        });
        markers.push(marker);
        bounds.extend(marker.position);
        marker.addListener("click", () => {
          that.populateInfoWindow(marker, infowindow);
        });
      });
      map.fitBounds(bounds);
      this.setState({
        map,
        markers,
        bounds,
      });

      // Bind the map's bounds (viewport) property to the autocomplete object,
      // so that the autocomplete requests use the current map bounds for the
      // bounds option in the request.
      autocomplete.bindTo("bounds", map);

      // Set the data fields to return when the user selects a place.
      autocomplete.setFields(["geometry", "name"]);

      autocomplete.addListener("place_changed", () => {
        infowindow.close();
        const place = autocomplete.getPlace();

        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No details available for input: '" + place.name + "'");
          return;
        }
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        let newlocation = {
          name: place.name,
          location: { lat: lat, lng: lng },
        };
        that.setState((state) => ({
          newLocations: [...state.newLocations, newlocation],
        }));
        that.addLocation(newlocation);
        this.setState({
          place: newlocation,
        });
      });
    }
  }

  onclickLocation = () => {
    const { infowindow } = this.state;

    const displayInfowindow = (e) => {
      const { markers } = this.state;

      const markerInd = markers.findIndex(
        (m) => m.title.toLowerCase() === e.target.innerText.toLowerCase()
      );

      this.populateInfoWindow(markers[markerInd], infowindow);
    };
    document
      .querySelector(".locations-list")
      .addEventListener("click", function (e) {
        if (e.target && e.target.nodeName === "LI") {
          displayInfowindow(e);
        }
      });
  };

  addLocation = (newlocation) => {
    const { google } = this.props;
    const { infowindow, bounds } = this.state;

    const newmarker = new google.maps.Marker({
      position: {
        lat: newlocation.location.lat,
        lng: newlocation.location.lng,
      },
      map: this.state.map,
      title: newlocation.name,
      icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    });

    newmarker.addListener("click", () => {
      this.populateInfoWindow(newmarker, infowindow);
    });

    newmarker.addListener("dblclick", (e) => {
      this.deletePlace(e);
    });

    this.setState((state) => ({
      markers: [...state.markers, newmarker],
    }));
    bounds.extend(newmarker.position);

    this.state.map.panTo(newmarker.position);
    this.state.map.setZoom(17);

    this.state.map.fitBounds(bounds);
    this.getNearbyPlaces(newlocation);
    this.getRestaurants(newlocation);
  };

  deletePlace = (e) => {
    let { newLocations, markers } = this.state;
    let markersArray = [];
    let event;
    let chosenOne = markers.filter((marker) => {
      event = e.va.currentTarget.title;
      if (marker.title === event) {
        return true;
      } else {
        markersArray.push(marker);
        return false;
      }
    });
    if (chosenOne.length > 0) {
      newLocations = newLocations.filter(
        (_location) =>
          _location.name.toLowerCase() !==
          e.va.currentTarget.title.toLowerCase()
      );
      if (newLocations.length >= 0) {
        chosenOne[0].setMap(null);
      }
    }
    this.setState({
      markers: markersArray,
      newLocations,
    });
  };

  populateInfoWindow = async (marker, infowindow) => {
    if (infowindow.marker !== marker) {
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      //
      await fetch(
        `https://api.unsplash.com/search/photos?page=1&query=${marker.title}`,
        {
          headers: {
            Authorization:
              "Client-ID ed4ea3b388f4503fa9a5817e2e5250171fd92b3b61ff520ff9f6027cff251a67",
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.setState({
            imgs: data.results,
          });
        })
        .catch((err) => {
          console.log("Error happened during fetching!", err);
        });
      //
      let arr = this.state.imgs;
      infowindow.marker = marker;
      infowindow.setContent(
        '<div style="background-color: black;">' +
          `<h2 style="color:white; text-align: center; padding-top: 20px;">${
            marker.title
          }</h2><div align="center"><a href='/learnmore?name=${
            marker.title
          }'>Learn more</a></div> <div align="center">${arr.map((image) => {
            return `<img style="margin-top: 5px; margin-bottom: 5px;" width=${"380"} height=${"auto"} src=${
              image.urls.regular
            } key=${image.id} alt="images of the chosen place"/>`;
          })}</div>` +
          "</div>"
      );

      this.state.map.panTo(marker.position);
      this.state.map.setZoom(17);

      infowindow.open(this.map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener("closeclick", function () {
        infowindow.marker = null;
        marker.setAnimation(null);
      });
    }
  };

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

  getRestaurants = async (place) => {
    if (place != undefined) {
      let lat = place.location.lat;
      let lng = place.location.lng;
      const response = await axios({
        method: "GET",
        url: `https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lng}`,
        headers: {
          "user-key": zomato_key,
          "content-type": "application/json",
        },
      });
      this.createRestaurants(response.data);
    }
  };

  renderRestaurants = () => {
    if (this.state.restaurants.length != 0) {
      return (
        <div>
          <h2 className="place-length" align="left">
            Restaurants in{" "}
            <strong className="place-strong">{this.state.nearby_search}</strong>{" "}
          </h2>
          {this.state.restaurants}
        </div>
      );
    } else {
      return (
        <div align="center">
          <h2 className="place-length" align="left">
            No Restaurants
          </h2>
          <FontAwesomeIcon
            className="calendar-ico calendar-icon-color"
            icon={faUtensils}
          ></FontAwesomeIcon>
          <div className="no-places-title" align="center">
            <h3 className="nope-title">Make Search to Receive Restaurants</h3>
          </div>
        </div>
      );
    }
  };

  getNearbyPlaces = async (place) => {
    if (place != undefined) {
      const response = await axios({
        method: "GET",
        url: `https://api.seatgeek.com/2/events?lat=${place.location.lat}&lon=${place.location.lng}&range=50mi&client_id=${seat_geek_client_id}`,
      });
      let res = [];
      for (var i = 0; i < response.data.events.length; i++) {
        let event = response.data.events[i];
        let taxes = [];
        let date = new Date(event.datetime_local);
        for (var j = 0; j < event.taxonomies.length; j++) {
          taxes.push(
            <span className="types">{event.taxonomies[j].name} </span>
          );
        }
        res.push(
          <div class="card-b">
            <div class="card-body">
              <h4 className="event-title">{event.title}</h4>
              <h5 className="event-taxes">
                <span>Type: </span>
                {taxes}
              </h5>
              <h5>
                <span>Popularity: </span>
                <span className="popularity">
                  {(event.popularity * 100).toFixed(2)}%{" "}
                </span>
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
              <span className="event-date">{date.toDateString()}</span>
            </div>
          </div>
        );
      }
      this.setState({
        nearby_search: place.name,
        nearby_places: res,
      });
    } else {
    }
  };

  renderNearbyPlaces() {
    if (this.state.nearby_places.length != 0) {
      return (
        <div>
          <h2 className="place-length" align="left">
            Events in{" "}
            <strong className="place-strong">{this.state.nearby_search}</strong>{" "}
          </h2>
          {this.state.nearby_places}
        </div>
      );
    }
    return (
      <div align="center">
        <h2 className="place-length" align="left">
          No Events
        </h2>
        <FontAwesomeIcon
          className="calendar-ico calendar-icon-color"
          icon={faCalendarAlt}
        ></FontAwesomeIcon>
        <div className="no-places-title" align="center">
          <h3 className="nope-title">Make Search to Receive Events</h3>
        </div>
      </div>
    );
  }

  render() {
    const { locations, newLocations } = this.state;
    let input;
    return (
      <div>
        <Navbar className="navbar-position" items={["u", "u", "u", "u"]} />
        <div className="row creation-row">
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
        ></link> */}

          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
          <script src="https://kit.fontawesome.com/a076d05399.js"></script>

          <div className="column-creation column-creation-left">
            <div className="header-bar">
              <div className="back-btn">
                <span>
                  <a href="/tripbuilder">
                    <FontAwesomeIcon
                      className="arrow-icon"
                      icon={faArrowLeft}
                    />
                  </a>
                </span>
              </div>
            </div>
            <div className="tab-comp">
              <Tabs>
                <div className="tab-content" label="Trip Plan" marker={faPlane}>
                  <h2 className="header"> // </h2>
                  <Provider store={store}>
                    <VisibleTodoList />
                  </Provider>
                </div>
                <div
                  className="tab-content"
                  label="Events"
                  marker={faMapMarkerAlt}
                >
                  <h2 className="header"> // </h2>
                  {this.renderNearbyPlaces()}
                </div>
                <div className="tab-content" label="Food" marker={faHamburger}>
                  <h2 className="header"> // </h2>
                  {this.renderRestaurants()}
                </div>
                <div
                  className="tab-content"
                  label="COVID-19 Info"
                  marker={faInfoCircle}
                >
                  <h2 className="header"> // </h2>
                </div>
              </Tabs>
            </div>
          </div>
          <div className="column-creation column-right">
            <input
              role="search"
              type="text"
              value={this.state.value}
              onChange={this.handleValueChange}
              id="search-input"
              className="search-input-bar"
            ></input>
            <span>
              <Provider store={store}>
                <AddTodo place={this.state.place} />
              </Provider>
            </span>
            <div className="container">
              <ul className="locations-list"></ul>
              <div role="application" className="map-creation" ref="map">
                loading map...
              </div>
            </div>
          </div>

          {/* <Footer /> */}
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCYqTOlIwQvYh30rp3riNLP137QWdTxzY4",
})(Creation);

connect()(AddTodo);
