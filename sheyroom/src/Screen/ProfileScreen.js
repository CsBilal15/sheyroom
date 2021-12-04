import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../Component/Loader";
import Errorr from "../Component/Error";
import swal from "sweetalert2";
import { Tag, Divider } from "antd";
const { TabPane } = Tabs;
const ProfileScreen = () => {
  const user = JSON.parse(localStorage.getItem("cuurentUser"));
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div>
      <Tabs defaultActiveKey="1" className="ms-5 mt-3 ">
        <TabPane tab="Profile" key="1" className="">
          <div className="col-md-10 shadow-lg fw-bold p-2 mb-1">
            <h1>My Profile</h1>
            <br />
            <p>Name : {user.name} </p>
            <p>Email : {user.email}</p>
            <p>IsAdmin : {user.IsAdmin ? "yes" : "No"}</p>
          </div>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <Mybooking />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProfileScreen;

export function Mybooking() {
  const user = JSON.parse(localStorage.getItem("cuurentUser"));
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  useEffect(async () => {
    try {
      setloading(true);
      const rooms = await (
        await axios.post("/api/bookings/getbookingsbyuserid", {
          userid: user._id,
        })
      ).data;
      console.log(rooms);
      setbookings(rooms);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error);
    }
  }, []);

  const cancelbookings = async (bookingid, roomid) => {
    try {
      setloading(true);
      const data = await (
        await axios.post("/api/bookings/cancelbooking", { bookingid, roomid })
      ).data;
      console.log(data);
      setloading(false);
      swal
        .fire(
          "Congrants",
          "Your booking has been cancelled sucessfully",
          "success"
        )
        .then((result) => {
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error);
      swal.fire("Oops", "something went wrong", "error");
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-10">
          {loading && <loader />}
          {bookings &&
            bookings.map((booking) => {
              return (
                <div className="sb mt-1">
                  <p>{booking.room}</p>
                  <p>
                    BookingID: <span> {booking._id}</span>
                  </p>
                  <p>
                    transactionId: <span>{booking.transactionid}</span>
                  </p>
                  <p>
                    CheakIn: <span>{booking.fromdate}</span>
                  </p>
                  <p>
                    Cheakout: <span>{booking.todate}</span>
                  </p>
                  <p>
                    Status:
                    <span>
                      {booking.status == "Cancelled" ? (
                        <Tag color="red">Cancelled</Tag>
                      ) : (
                        <Tag color="green">Confirmed</Tag>
                      )}
                    </span>
                  </p>
                  <div className="textright">
                    {booking.status !== "Cancelled" && (
                      <button
                        className="btn btn-dark"
                        onClick={() => {
                          cancelbookings(booking._id, booking.roomid);
                        }}
                      >
                        Cancelled
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
