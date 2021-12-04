import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Component/Loader";
import Errorr from "../Component/Error";
import moment from "moment";
import swal from "sweetalert2";
import StripeCheckout from "react-stripe-checkout";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { duration } from "moment";
// ..
AOS.init({
  duration: 500,
});

const BookingScreen = () => {
  const [room, setroom] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [totalamount, settotalamount] = useState();

  const id = useParams();
  const roomid = id.roomid;
  const fromdate = moment(id.fromdate, "DD-MM-YYYY");
  const todate = moment(id.todate, "DD-MM-YYYY");

  const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;
  console.log(id);

  useEffect(async () => {
    if (!localStorage.getItem("cuurentUser")) {
      window.location.href = "/login";
    }

    try {
      setloading(true);
      const data = (
        await axios.post("/api/rooms/getroombyid", { roomid: id.roomid })
      ).data;
      settotalamount(data.rentperday * totaldays);
      setroom(data);
      setloading(false);
    } catch (error) {
      seterror(true);

      console.log(error);
      setloading(false);
    }
  }, []);

  async function onToken(token) {
    const bookingdetails = {
      room,
      userid: JSON.parse(localStorage.getItem("cuurentUser"))._id,
      fromdate,
      todate,
      totaldays,
      totalamount,
      totaldays,
      token,
    };
    try {
      setloading(true);
      const result = await axios.post(
        " /api/bookings/bookroom",
        bookingdetails
      );
      setloading(false);
      swal
        .fire("Congratulations", "Your Room Is Booked", "success")
        .then((result) => {
          window.location.href = "/profile";
        });
    } catch (error) {
      setloading(false);
      console.log(error);
      swal.fire("Ooops", "Some Thing Went Wrong", "error");
    }
  }

  return (
    <div data-aos="flip-left">
      {loading ? (
        <h1>
          <Loader />
        </h1>
      ) : room ? (
        <div>
          <div className="container bs">
            <div className="row">
              <div className="col-md-6">
                <h5 className="fw-bold mb-4">{room.name}</h5>
                <img
                  src={room.imageurls[0]}
                  className="img-fluid bigimage "
                ></img>
              </div>
              <div className="col-md-6">
                <div className="bookingsdata">
                  <h3>Booking Details</h3>
                  <hr />
                  <b>
                    <p>
                      {JSON.parse(localStorage.getItem("cuurentUser")).name}
                    </p>
                    <p>From Date : {id.fromdate} </p>
                    <p>To Date : {id.todate}</p>
                    <p>Max Count :{room.maxcount}</p>
                  </b>
                </div>

                <div className="bookingsdata">
                  <h3>Amount</h3>
                  <hr />
                  <b>
                    <p>Totals Days : {totaldays}</p>
                    <p>Rent Per Day : {room.rentperday}</p>
                    <p>Total Amount : {totalamount}</p>
                  </b>
                </div>
                <div style={{ float: "right" }}>
                  <StripeCheckout
                    amount={totalamount * 100}
                    token={onToken}
                    currency="PKR"
                    stripeKey="pk_test_51Juq9WBQek6DJaoPGwE6E0IRMlbyL0RqClXew5antzDLiETVdk7PlH015BMbfY171JTbhhCzzXNgW3q7UKaYg4Y000ukw9FNFm"
                  >
                    <button className="btn btn-dark">Pay Now</button>
                  </StripeCheckout>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Errorr />
      )}
    </div>
  );
};

export default BookingScreen;
