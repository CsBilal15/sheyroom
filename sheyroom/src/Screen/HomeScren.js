import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "./Room";
import Loader from "../Component/Loader";
import Errorr from "../Component/Error";
import moment from "moment";
import { DatePicker, Space } from "antd";
import "antd/dist/antd.css";
const { RangePicker } = DatePicker;
const HomeScren = () => {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicateroom, setduplicateroom] = useState([]);
  const [serchkey, setserchkey] = useState("");
  const [type, settype] = useState("all");
  useEffect(async () => {
    try {
      setloading(true);
      const data = (await axios.get("/api/rooms/getallroom")).data;
      setrooms(data);
      setduplicateroom(data);
      setloading(false);
    } catch (error) {
      seterror(true);

      console.log(error);
      setloading(false);
    }
  }, []);

  function getdate(dates) {
    setfromdate(moment(dates[0]).format("DD-MM-YYYY"));
    settodate(moment(dates[1]).format("DD-MM-YYYY"));

    var temproom = [];
    var availability = false;
    for (const room of duplicateroom) {
      if (room.currentbookings.length > 0) {
        for (const bookings of room.currentbookings) {
          if (
            !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              bookings.fromdate,
              bookings.todate
            ) &&
            !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              bookings.fromdate,
              bookings.todate
            )
          ) {
            if (
              moment(dates[0]).format("DD-MM-YYYY") !== bookings.fromdate &&
              moment(dates[0]).format("DD-MM-YYYY") !== bookings.todate &&
              moment(dates[1]).format("DD-MM-YYYY") !== bookings.fromdate &&
              moment(dates[1]).format("DD-MM-YYYY") !== bookings.todate
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability == true || room.currentbookings.length == 0) {
        temproom.push(room);
      }
      setrooms(temproom);
    }
  }
  function searchfilter() {
    const temproom = duplicateroom.filter((room) =>
      room.name.toLowerCase().includes(serchkey.toLowerCase())
    );
    setrooms(temproom);
  }
  function filterbytype(e) {
    settype(e);
    if (e !== "all") {
      const temproom = duplicateroom.filter(
        (room) => room.type.toLowerCase() == e.toLowerCase()
      );
      setrooms(temproom);
    } else {
      setrooms(duplicateroom);
    }
  }
  return (
    <div className="container">
      <div className="row bs">
        <div className="col-md-4 mt-2">
          <RangePicker format="DD-MM-YYYY" onChange={getdate} />
        </div>
        <div className="col-md-4">
          <input
            className="form-control "
            placeholder="Search Room"
            value={serchkey}
            onChange={(e) => {
              setserchkey(e.target.value);
            }}
            onKeyUp={searchfilter}
          ></input>
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            value={type}
            onChange={(e) => {
              filterbytype(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Delux</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mx-auto mt-5 ">
          {loading ? (
            <Loader />
          ) : (
            rooms.map((room) => {
              return (
                <div className="col-md-12 mt-3">
                  <Room room={room} fromdate={fromdate} todate={todate} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeScren;
/* */
