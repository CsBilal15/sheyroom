import React, { useState } from "react";
import { Button, Modal, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { duration } from "moment";
// ..
AOS.init({
  duration: 500,
});

const Room = ({ room, fromdate, todate }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row  bs" data-aos="fade-up">
      <div className="col-md-4">
        <img src={room.imageurls[0]} className="imghotel"></img>
      </div>
      <div className="col-md-7">
        <h1 className="main-heading">{room.name}</h1>
        <p>Max Count : {room.maxcount} </p>
        <p>Phone Number : {room.phonenumber} </p>
        <p>Type : {room.type}</p>
        <div style={{ float: "right" }}>
          {fromdate && todate && (
            <Link
              to={`/book/${room._id}/${fromdate}/${todate}`}
              className="link1"
            >
              <button className="btn btn-dark me-4"> Book Now </button>
            </Link>
          )}
          <button className="btn btn-dark" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mx-auto col-12">
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="main-heading">{room.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Carousel>
                {room.imageurls.map((url) => {
                  return (
                    <Carousel.Item>
                      <img
                        className="d-block w-100 bigimg"
                        src={url}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
              <p>{room.description} </p>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Room;
