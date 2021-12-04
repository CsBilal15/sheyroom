import React from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { duration } from "moment";
// ..
AOS.init({
  duration: 3000,
});
const LandingScreen = () => {
  return (
    <div className="row landing">
      <div className="col-md-12 col-12 text-center">
        <h1 data-aos="zoom-in" className="headl1">
          SheyRooms
        </h1>
        <h2 data-aos="zoom-out" className="text-capitalize headl2">
          "there is only one boos.the guest."
        </h2>
        <Link to="/home">
          <button className="btn getbutton">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingScreen;
