import React from "react";
import "./Rooms.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
export default function Rooms({ room, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bs">
      <div className="max">
        <img src={room.imageurls[0]} className="smallimg"></img>
      </div>
      <div className="jj">
        <h1>{room.name}</h1>
          <div className="par">
            <p>Max Count:{room.maxcount}</p>
          <p>Phone Number:{room.phonenumber}</p>
          <p>Type : {room.type}</p>
        </div>
          {fromdate && todate && (
            <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
              <button className="btn1">Book Now </button>
            </Link>
          )}
          {/* <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
            <Button className="btn btn-primary m-2">Book Now</Button>
          </Link> */}
          <button className="btn" onClick={handleShow}>
            View details
          </button>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {room.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100 bigimg" src={url} />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
