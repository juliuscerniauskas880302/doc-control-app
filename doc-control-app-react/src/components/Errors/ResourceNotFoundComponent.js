import React from "react";
import { Link } from "react-router-dom";
import "./ResourceNotFound.css";
import music from "./home.mp3";

export default class ResourceNotFoundCompoentn extends React.Component {
  componentDidMount = () => {};
  render() {
    return (
      <div class="page-holder w-100 d-flex flex-wrap">
        <div class="container-fluid px-xl-5">
          <iframe
            title="player"
            src={music}
            allow="autoplay"
            frameBorder="0"
            width="0"
            height="0"
            loop
          />

          <section class="page_404">
            <div class="col-sm-12 ">
              <div class="col-sm-10 col-sm-offset-1  text-center">
                <div class="four_zero_four_bg">
                  <h1 class="text-center ">404</h1>
                </div>

                <div class="contant_box_404">
                  <h3 class="h2">Rodos tu pasiklydai</h3>

                  <p>puslapis, kurio ieškai neegzistuoja!</p>
                  <Link to="/">
                    <div class="link_404">Grįžti atgal</div>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
