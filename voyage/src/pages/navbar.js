import React from "react";
import "./styles/navbar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobeAmericas,
  faCalendarAlt,
  faList,
  faSuitcaseRolling,
  faTachometerAlt,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

function Navbar({ items }) {
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Lato:100"
        rel="stylesheet"
        type="text/css"
      ></link>
      <nav class="navbar navbar-dark">
        <ul className="navbar-line">
          <li className="list-item">
            <h1 class="logo">
              <FontAwesomeIcon className="logo-icon" icon={faGlobeAmericas} />{" "}
              AfterMath
            </h1>
          </li>
          <li className="list-item">
            <a class={items[0]} href="/">
              <FontAwesomeIcon className="ic" icon={faTachometerAlt} />
              Dashboard
            </a>
          </li>
          <li className="list-item">
            <a class={items[1]} href="/Trips">
              <FontAwesomeIcon className="ic" icon={faSuitcaseRolling} />
              Trip Builder
            </a>
          </li>
          <li className="list-item">
            <a class={items[2]} href="/Calendar">
              <FontAwesomeIcon className="ic" icon={faCalendarAlt} />
              Calendar
            </a>
          </li>
          <li className="list-item">
            <a class={items[3]} href="/Events">
              <FontAwesomeIcon className="ic" icon={faList} />
              Events
            </a>
          </li>
          <li className="list-item">
            <a class={items[4]} href="/Bored">
              <FontAwesomeIcon className="ic" icon={faQuestion} />
              Bored
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
