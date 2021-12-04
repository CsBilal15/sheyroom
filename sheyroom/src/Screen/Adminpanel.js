import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../Component/Loader";
import Errorr from "../Component/Error";
import Addroom from "../Component/Addroom";
const { TabPane } = Tabs;
const Adminpanel = () => {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("cuurentUser")).IsAdmin) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div>
      <div className="bs mt-3 ms-3 me-3">
        <h3 className="text-center">
          <b> Admin Panel</b>
        </h3>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Booking" key="1">
            <Booking />
          </TabPane>
          <TabPane tab="Rooms" key="2">
            <Rooms></Rooms>
          </TabPane>
          <TabPane tab="Add Room" key="3">
            <Addroom />
          </TabPane>
          <TabPane tab="Users" key="4">
            <Users />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Adminpanel;

export function Booking() {
  const [bookings, setbooking] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  useEffect(async () => {
    try {
      const data = await (await axios.get("/api/bookings/getallbookings")).data;
      setbooking(data);
      setloading(false);
      console.log(data);
    } catch (error) {
      console.log();
      setloading(false);
      seterror(true);
    }
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-md-12 col-12 ">
          <h1 className=" mb-3 fw-bold text-center">All Bookings</h1>
          {loading && <loder />}
          <table className="table table-dark table-bordered">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>User ID</th>
                <th>Room</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length &&
                bookings.map((booking) => {
                  return (
                    <tr>
                      <td>{booking._id}</td>
                      <td>{booking.userid}</td>
                      <td>{booking.room}</td>
                      <td>{booking.fromdate}</td>
                      <td>{booking.todate}</td>
                      <td>{booking.status}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function Rooms() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  useEffect(async () => {
    try {
      const data = await (await axios.get("/api/rooms/getallroom")).data;
      setrooms(data);
      setloading(false);
      console.log(data);
    } catch (error) {
      console.log();
      setloading(false);
      seterror(true);
    }
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-md-12 col-12 ">
          <h1 className="mb-3 fw-bold text-center">All Rooms </h1>
          {loading && <loder />}
          <table className="table table-dark table-bordered">
            <thead>
              <tr>
                <th>Room ID</th>
                <th>Room</th>
                <th>Type</th>
                <th>Rent Per day</th>
                <th>Max count</th>
                <th>Phone No.</th>
              </tr>
            </thead>
            <tbody>
              {rooms.length &&
                rooms.map((room) => {
                  return (
                    <tr>
                      <td>{room._id}</td>
                      <td>{room.name}</td>
                      <td>{room.type}</td>
                      <td>{room.rentperday}</td>
                      <td>{room.maxcount}</td>
                      <td>{room.phonenumber}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function Users() {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  useEffect(async () => {
    try {
      const data = await (await axios.get("/api/users/getallusers")).data;
      setusers(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
    }
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center fw-bold mb-4">All Users</h1>
          {loading && <loder />}
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>IS Admin</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => {
                  return (
                    <tr>
                      <td>{user._id}</td>
                      <td>{user.name} </td>
                      <td>{user.email} </td>
                      <td>{user.IsAdmin ? "Yes" : "No"} </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
