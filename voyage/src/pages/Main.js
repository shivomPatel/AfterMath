import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import LearnMore from "./LearnMore";
import Map from "./Map";
import { Route } from "react-router-dom";
import Navbar from "./navbar";
import DatatablePage from "./Table";
import Preloader from "./Preloader";
import Footer from "./footer";
import "./styles/main.css";
import "./styles/map.css";

const places = [
  {
    place: "Cancun",
    imageuURL:
      "https://cdn.travelpulse.com/images/99999999-9999-9999-9999-999999999999/42c9d71d-0a9d-c6a3-bf2d-e485fa153bb8/630x355.jpg",
    description:
      "Located on the Caribbean coast of southeastern Mexico, Cancun is one of the world's most beautiful beach destinations. Sunbathe on the white sandy beaches, scuba dive, then head into the city for dining, shopping, and nightlife.",
  },
  {
    place: "Costa Rica",
    imageuURL:
      "https://www.roughguides.com/wp-content/uploads/2016/10/arenal-volcano-costa-rica-shutterstock_1337924888.jpg",
    description:
      "The beautiful country, filled with rainforests, beaches, river valleys, and biodiverse wildlife as well as restaurants, bars, and luxe hotels, has always been a great place to take a vacation, but it has gained popularity as an amazing destination in the last few years.",
  },
  {
    place: "Hawaii",
    imageuURL:
      "https://cvsite-prod-s3fs-files.s3-us-west-2.amazonaws.com/s3fs-public/main-hawaii-pool_0.jpg",
    description:
      "The warm water, the plentiful reefs, fish, turtles, whales, and barracuda make the beautiful Hawaii islands a great place to spend a lot of time in the water. With all the different things Hawaii has to offer, it surely ranks as the most beautiful place on Earth.",
  },
  {
    place: "Colorado",
    imageuURL:
      "https://bloximages.newyork1.vip.townnews.com/gazette.com/content/tncms/assets/v3/editorial/c/80/c80a1664-6edf-11ea-9520-c39ef2ffd2b0/5e7bcd891eebb.image.jpg?resize=1200%2C800",
    description:
      "Colorado is the ideal winter destination with unparalleled skiing, snowboarding, snowshoeing, ice-skating, snow tubing, snowmobiling, sleigh rides, events and festivals, and a rich cultural heritage.",
  },
  {
    place: "Dominican Republic",
    imageuURL:
      "https://i.insider.com/5d02597edaa4822f7e0a2216?width=1100&format=jpeg&auto=webp",
    description:
      "Dominican Republic is ensconced as the Caribbean’s most visited destination. It’s not hard to see why; a seemingly endless spread of white-sandy beaches and palm trees play host to a similarly sizeable range of holiday resorts.",
  },
  {
    place: "Alaska",
    imageuURL:
      "https://lindaontherun.com/wp-content/uploads/2019/09/Alaska9-Denali.jpg",
    description:
      "It is rugged and wild with glaciers, countless rivers and lakes, majestic mountain peaks, some active volcanoes, and nearly 34,000 miles of tidal shoreline.",
  },
  {
    place: "New Zealand",
    imageuURL:
      "https://www.newzealand.com/assets/Tourism-NZ/Fiordland/img-1536137761-110-7749-p-7ECF7092-95BD-FE18-6D4107E2E42D067E-2544003__aWxvdmVrZWxseQo_FocalPointCropWzQyNyw2NDAsNTAsNTAsODUsImpwZyIsNjUsMi41XQ.jpg",
    description:
      "New Zealand is famous the world over for its incredible scenery, ranging from sweeping mountains to vast underground cave systems, gigantic glaciers to boiling hot springs, golden-sand beaches to rugged coastline. It's also packed with cool cities, hidden spots, wonderful wildlife, and more.",
  },
  {
    place: "Santorini",
    imageuURL:
      "https://lp-cms-production.imgix.net/features/2016/04/Santorini-53c9e0dca77b.jpg?format=auto",
    description:
      "Santorini is the most popular island in Greece. It may be the most popular island in the world. There are few travel destinations that combine beautiful beaches, spectacular scenery, ancient cities, amazing restaurants, some of the world's best wine, and an active volcano.",
  },
];

let visible = false;
let arr = [];
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      data: [],
    };
    this.getRange = this.getRange.bind(this);
  }

  updateName = (name) => {
    this.setState({
      name: name,
    });
  };

  onclickMenu = () => {
    const list = document.getElementsByClassName("text-input");
    if (list.length === 0) {
      window.location.assign("/");
    } else {
      if (visible === true) {
        list[0].style.left = "-200px";
        list[0].style.transition = "left 1s ease-in-out";
        visible = false;
      } else {
        visible = true;
        list[0].style.left = "0";
        list[0].style.transition = "left 1s ease-in-out";
      }
    }
  };

  getRange = (cases) => {
    if (cases >= 0 && cases <= 1000) {
      return "0 to 1,000";
    }
    if (cases >= 1001 && cases <= 5000) {
      return "1,001 to 5,000";
    }
    if (cases >= 5001 && cases <= 10000) {
      return "5,001 to 10,000";
    }
    if (cases >= 10001 && cases <= 20000) {
      return "10,001 to 20,000";
    }
    if (cases >= 20001 && cases <= 40000) {
      return "20,001 to 40,000";
    }
    if (cases >= 40001) {
      return "40,001 or more";
    }
  };

  componentDidMount() {
    // US Data
    let requestURL =
      "https://api.apify.com/v2/key-value-stores/moxA3Q0aZh5LosewB/records/LATEST?disableRedirect=true";
    let request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType = "json";
    request.send();
    request.onload = function () {
      const virusByState = request.response.casesByState;
      for (var i = 0; i < virusByState.length; i++) {
        arr.push({
          name: virusByState[i].name,
          casesReported: virusByState[i].casesReported.toLocaleString(),
          range: virusByState[i].range,
        });
      }
    };

    // World Data
    let requestURL2 = "https://www.trackcorona.live/api/countries";
    let request2 = new XMLHttpRequest();
    request2.open("GET", requestURL2);
    request2.responseType = "json";
    request2.send();
    request2.onload = () => {
      console.log(request2.response);
      for (var i = 0; i < request2.response.data.length; i++) {
        let Range = this.getRange(request2.response.data[i].confirmed);
        arr.push({
          name: request2.response.data[i].location,
          casesReported: request2.response.data[i].confirmed.toLocaleString(),
          range: Range,
        });
      }
    };
  }

  renderPlaces() {
    var placeCards = [];
    for (var i = 0; i < places.length; i++) {
      placeCards.push(
        <div className="card">
          <header className="article-header">
            <a href={"/learnmore?name=" + places[i].place}>
              <div className="article-title">{places[i].place}</div>
            </a>

            <div>
              <div>
                Info:
                <p> {places[i].description}</p>
              </div>
            </div>
            <div>
              <img
                className="images"
                src={places[i].imageuURL}
                width="375"
                height="230"
              />
            </div>
          </header>
        </div>
      );
    }
    return placeCards;
  }

  render() {
    return (
      <div className="bg">
        {/* <Preloader /> */}
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
          <Navbar items={["active", "u", "u", "u", "u"]} />
          <div className="pagebody">
            <div className="container-fluid">
              <div className="rows">
                <h2 align="left" className="display-4" className="explore">
                  Explore AfterMath!
                </h2>

                <div className="mapbox">
                  <div>
                    <a
                      onClick={this.onclickMenu}
                      className="menu"
                      tabIndex="0"
                    ></a>

                    <Route
                      path="/"
                      exact
                      render={(props) => (
                        <Map
                          updateName={this.updateName}
                          google={this.props.google}
                        />
                      )}
                    />
                    <Route path="/learnmore" component={LearnMore} />
                  </div>
                </div>

                <h2 className="covid-title">COVID-19 Update</h2>
                <div class="row">
                  <div class="column-m">
                    <h3>Center of Disease Control Travel Considerations</h3>
                    <p className="considerations-p">
                      "Travel increases your chances of getting and spreading
                      COVID-19. We don’t know if one type of travel is safer
                      than others; however, airports, bus stations, train
                      stations, and rest stops are all places travelers can be
                      exposed to the virus in the air and on surfaces. These are
                      also places where it can be hard to social distance (keep
                      6 feet apart from other people)."
                    </p>
                    <p> </p>
                    <p className="consideration">
                      Consider the following risks for getting or spreading
                      COVID-19, depending on how you travel:
                    </p>
                    <p> </p>
                    <ul className="ul-c">
                      <li>
                        <span className="consideration-item">Air travel: </span>
                        Air travel requires spending time in security lines and
                        airport terminals, which can bring you in close contact
                        with other people and frequently touched surfaces. Most
                        viruses and other germs do not spread easily on flights
                        because of how air circulates and is filtered on
                        airplanes. However, social distancing is difficult on
                        crowded flights, and you may have to sit near others
                        (within 6 feet), sometimes for hours. This may increase
                        your risk for exposure to the virus that causes
                        COVID-19.
                      </li>
                      <li>
                        <span className="consideration-item">
                          Bus or train travel:
                        </span>
                        Traveling on buses and trains for any length of time can
                        involve sitting or standing within 6 feet of others.
                      </li>
                      <li>
                        <span className="consideration-item">Car travel: </span>
                        Making stops along the way for gas, food, or bathroom
                        breaks can put you and your traveling companions in
                        close contact with other people and surfaces.
                      </li>
                      <li>
                        <span className="consideration-item">RV travel: </span>
                        You may have to stop less often for food or bathroom
                        breaks, but RV travel typically means staying at RV
                        parks overnight and getting gas and supplies at other
                        public places. These stops may put you and those with
                        you in the RV in close contact with others.
                      </li>
                    </ul>
                    <p>
                      For more information:
                      <a href="https://www.cdc.gov/coronavirus/2019-ncov/travelers/travel-in-the-us.html">
                        https://www.cdc.gov/coronavirus/2019-ncov/travelers/travel-in-the-us.html
                      </a>
                    </p>
                  </div>
                  <div class="column-m">
                    <div class="covid-table">
                      <DatatablePage items={arr} />
                    </div>
                  </div>
                </div>

                <h1 className="search-title">Popular Places</h1>
                <div className="popular-container">
                  <p className="lead"></p>

                  <div className="card-container">{this.renderPlaces()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

// export default Main;
export default GoogleApiWrapper({
  apiKey: "AIzaSyCYqTOlIwQvYh30rp3riNLP137QWdTxzY4",
})(Main);
