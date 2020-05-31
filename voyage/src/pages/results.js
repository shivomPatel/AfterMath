import React, { Component } from "react";
import "./styles/results.css";

const key = "AIzaSyCYqTOlIwQvYh30rp3riNLP137QWdTxzY4";
class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      news: [],
      search: props.item,
      imageURL: null,
      imageWidth: null,
      imageHeight: null,
    };
  }

  componentDidMount() {
    console.log(this.props.item.place_id);

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url =
      "https://maps.googleapis.com/maps/api/place/details/json?place_id=" +
      this.props.item.place_id +
      "&fields=name,photo&key=AIzaSyCYqTOlIwQvYh30rp3riNLP137QWdTxzY4"; // site that doesn’t send Access-Control-*
    fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
      .then((response) => response.json())
      .then((contents) => {
        console.log(contents);
        this.setState({
          imageURL:
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" +
            contents.result.photos[0].width +
            "&photoreference=" +
            contents.result.photos[0].photo_reference +
            "&key=AIzaSyCYqTOlIwQvYh30rp3riNLP137QWdTxzY4",
          imageWidth: contents.result.photos[0].width,
          imageHeight: contents.result.photos[0].height,
        });
      })
      .catch(() =>
        console.log("Can’t access " + url + " response. Blocked by browser?")
      );
  }

  render() {
    return (
      <div>
        <div className="card2">
          <header className="article-header">
            <div className="article-title">
              {this.state.search.formatted_address}
            </div>
            {/* Temporary Info Item */}
            <div className="category-title">
              Info:
              <span className="date"> //info </span>
            </div>

            <div>
              <img src={this.state.imageURL} width="475" height="350" />
            </div>
          </header>
        </div>
      </div>
    );
  }
}

export default Results;
