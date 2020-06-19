import React, { Component } from "react";
import "./styles/footer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faShareAltSquare,
} from "@fortawesome/free-solid-svg-icons";

export class Footer extends Component {
  render() {
    return (
      <footer className="page-footer font-small blue pt-4">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-4 mt-md-0 mt-2">
              <h5 className="text-uppercase">ABOUT</h5>
              <p className="about">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries,
              </p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-3" />

            <div className="col-md-4 mb-md-0 mb-2">
              <h5 className="text-uppercase">Links</h5>

              <ul className="list-unstyled">
                <li>
                  <i className="fa fa-github"></i>
                  {"    "}
                  <a href="https://github.com/shivomPatel">
                    https://github.com/shivomPatel
                  </a>
                </li>
                <li>
                  LinkedIn:
                  <a href="www.linkedin.com/in/shivom-patel-569a36173">
                    www.linkedin.com/in/shivom-patel-569a36173
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-4 mb-md-0 mb-2">
              <h5 className="text-uppercase">CONTACTS</h5>

              <ul className="list-unstyled">
                <li>
                  <FontAwesomeIcon className="footer-icon" icon={faEnvelope} />
                  patelshivom0918@gmail.com
                </li>
                <li>
                  <FontAwesomeIcon
                    className="footer-icon"
                    icon={faShareAltSquare}
                  />
                  Instagram: hd.shivompatel
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-copyright text-center py-3">
          © 2020 Copyright
        </div>
      </footer>
    );
  }
}

export default Footer;
