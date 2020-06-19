import React, { Component } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import Button from "./components/Button";
import "./styles/review.css";

class Review extends Component {
  constructor() {
    super();

    this.state = {
      isActive: false,
      reviews: [
        {
          rating: 3,
          name: "Danny van Holten",
          review:
            "Curabitur blandit mollis lacus. Curabitur suscipit suscipit tellus. Phasellus tempus.\n\n Quisque rutrum. Nulla sit amet est. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci.",
          date: new Date(new Date().setDate(new Date().getDate() - 10)),
        },
        {
          rating: 4,
          name: "Max Verstappen",
          review:
            "Curabitur blandit mollis lacus. Curabitur suscipit suscipit tellus. Phasellus tempus.\n\n Quisque rutrum. Nulla sit amet est. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci.",
          date: new Date(),
        },
      ],
      validation: "",
    };
  }

  handleShow = () => {
    this.setState({
      isActive: true,
    });
  };

  handleHide = () => {
    this.setState({
      isActive: false,
    });
  };

  componentDidMount() {}
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

        <div align="center" className="review-background">
          <Navbar items={["u", "u", "active", "u"]}></Navbar>
          <div align="center" className="reviews-title">
            <h2>Reviews</h2>
            <p className="review-description">
              Review your trip here by telling us what went wrong, what went
              right, what you liked, and what you didn't like.
            </p>
          </div>
          <div className="review-box">
            <div className="average-box" align="left">
              Average review rating for <strong>{"insert_place_here"}</strong>:{" "}
              <strong className="average-rating">{"enter_score_here"}</strong>
            </div>
            <hr></hr>
          </div>
          <div className="review-submission-box">
            {!this.state.isActive ? (
              <button className="write-button" onClick={this.handleShow}>
                Write a Review
              </button>
            ) : null}
            {/* <button onClick={this.handleHide}>Hide</button> */}
            {this.state.isActive ? (
              <div>
                <div align="left">
                  <h3 className="user-review-title">Your Review</h3>
                </div>

                <form>
                  <div>
                    <input className="name-input" placeholder="Name"></input>
                  </div>
                  <div>
                    <textarea
                      className="review-input"
                      placeholder="Write review here..."
                    ></textarea>
                  </div>
                </form>
              </div>
            ) : null}
            {this.state.isActive ? (
              <button className="write-button submit" onClick={this.handleHide}>
                Submit your Review
              </button>
            ) : null}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Review;
