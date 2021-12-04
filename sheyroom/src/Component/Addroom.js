import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Component/Loader";
import Errorr from "../Component/Error";
import swal from "sweetalert2";
const Addroom = () => {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  const [name, setname] = useState("");
  const [rentperday, setrentperday] = useState();
  const [maxcount, setmaxcount] = useState();
  const [description, setdiscription] = useState();
  const [phonenumber, setphone] = useState();
  const [type, settype] = useState();
  const [imgl1, setimgl1] = useState();
  const [imgl2, setimgl2] = useState();
  const [imgl3, setimgl3] = useState();
  const addRoom = async () => {
    const newroom = {
      name,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type,
      imgurls: [imgl1, imgl2, imgl3],
    };
    console.log(newroom);
    try {
      setloading(true);
      const data = await (await axios.post("/api/rooms/addroom", newroom)).data;
      console.log(data);
      setloading(false);
      swal.fire("Congrunts", "your room is added succesfully", "success").then((data)=>{
        window.location.href="/home";
      });
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
      swal.fire("Opps", "Something Went Wrong", "error");
    }
  };
  return (
    <div>
      <div className="row">
        {loading && <loader />}
        <h1 className="text-center fw-bold mb-3">Add New Room</h1>
        <div className="col-md-6">
          <input
            type="text"
            placeholder="Enter room name"
            className="form-control"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter room rent per day"
            className="form-control"
            value={rentperday}
            onChange={(e) => {
              setrentperday(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter room max_count"
            className="form-control"
            value={maxcount}
            onChange={(e) => {
              setmaxcount(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter room description"
            className="form-control"
            value={description}
            onChange={(e) => {
              setdiscription(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter phone number"
            className="form-control"
            value={phonenumber}
            onChange={(e) => {
              setphone(e.target.value);
            }}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            placeholder="Enter room type"
            className="form-control"
            value={type}
            onChange={(e) => {
              settype(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter image url 1"
            className="form-control"
            value={imgl1}
            onChange={(e) => {
              setimgl1(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter image url 2"
            className="form-control"
            value={imgl2}
            onChange={(e) => {
              setimgl2(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter image url 3 "
            className="form-control"
            value={imgl3}
            onChange={(e) => {
              setimgl3(e.target.value);
            }}
          />
          <div style={{ float: "right" }} className="mt-2">
            <button className="btn btn-dark" onClick={addRoom}>
              Add Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addroom;
