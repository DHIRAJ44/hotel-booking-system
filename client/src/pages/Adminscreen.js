import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";
import { Tabs } from "antd";
import { Tag, Divider } from "antd";
const { TabPane } = Tabs;

const Adminscreen = () => {
  // useEffect(()=>{
  //     if(!JSON.parse(localStorage.getItem("currentUser")).isAdmin){
  //         window.location.href="/home"
  //     }
  // })

  return (
    <div className="mt-3 ml-3 mr-3 adminpanel">
      <h1 style={{ frontSize: "30px" }}>
        <b>Admin Panel</b>
      </h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add Room" key="3">
          <Addroom></Addroom>
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
};

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setloading] = useState(true); // Initialize loading to true
  const [error, seterror] = useState(); // Initialize error to false
  useEffect(() => {
    setloading(true);
    axios
      .get("http://localhost:3000/api/bookings/getallbookings")
      .then((response) => {
        console.log(response.data);
        setBookings(response.data);
        setloading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setloading(false);
      });
  }, []);
  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Bookings</h1>
        {loading && <Loader></Loader>}
        <table className="table table-bordered table-dark">
          <thead className="adminpanel">
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
  );
}
export function Rooms() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(true); // Initialize loading to true
  const [error, seterror] = useState(); // Initialize error to false
  useEffect(() => {
    setloading(true);
    axios
      .get("http://localhost:3000/api/products")
      .then((response) => {
        setrooms(response.data.myData);
        setloading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setloading(false);
      });
  }, []);
  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Rooms</h1>
        {loading && <Loader></Loader>}
        <table className="table table-bordered table-dark">
          <thead className="adminpanel">
            <tr>
              <th>Room ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent Per day</th>
              <th>Max Count</th>
              <th>Phone Number</th>
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
  );
}
export function Users() {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(true); // Initialize loading to true
  const [error, seterror] = useState(); // Initialize error to false
  useEffect(() => {
    setloading(true);
    axios
      .post("http://localhost:3000/api/users/getallusers")
      .then((response) => {
        console.log(response.data);
        setusers(response.data);
        setloading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setloading(false);
      });
  }, []);
  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "YES" : "NO"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Addroom() {
  const [loading, setloading] = useState(false); // Initialize loading to true
  const [error, seterror] = useState(); // Initialize error to false
  const [name, setname] = useState("");
  const [rentperday, setrentperday] = useState("");
  const [maxcount, setmaxcount] = useState();
  const [description, setdescription] = useState();
  const [phonenumber, setphonenumber] = useState();
  const [type, settype] = useState();
  const [Imageurl1, setImageurl1] = useState();
  const [Imageurl2, setImageurl2] = useState();
  const [Imageurl3, setImageurl3] = useState();
  const [rooms, setrooms] = useState([]);
  function AddRoom() {
    const newroom = {
      name,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type,
      imageurls: [Imageurl1, Imageurl2, Imageurl3],
    };
    try {
      setloading(true);
      const result = axios.post(
        "http://localhost:3000/api/products/addroom",
        {newroom},
        { withCredentials: true },
      );
      setloading(false);
      Swal.fire("congrats", "your new room added successfully", "success").then(
        (result) => {
          window.location.href = "/home";
        }
      );
    } catch (error) {
      console.log(error);
      setloading(false);
      Swal.fire("OOps", "something went wrong", "error");
    }
  }

  return (
    <div className="row">
      <div className="col-md-5">
        {loading && <Loader></Loader>}
        <input
          type="text"
          className="form-control"
          placeholder="room name"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        ></input>
        <input
          type="text"
          className="form-control"
          placeholder="rent per day"
          value={rentperday}
          onChange={(e) => {
            setrentperday(e.target.value);
          }}
        ></input>
        <input
          type="text"
          className="form-control"
          placeholder="max count"
          value={maxcount}
          onChange={(e) => {
            setmaxcount(e.target.value);
          }}
        ></input>
        <input
          type="text"
          className="form-control"
          placeholder="description"
          value={description}
          onChange={(e) => {
            setdescription(e.target.value);
          }}
        ></input>
        <input
          type="text"
          className="form-control"
          placeholder="phone number"
          value={phonenumber}
          onChange={(e) => {
            setphonenumber(e.target.value);
          }}
        ></input>
      </div>

      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="type"
          value={type}
          onChange={(e) => {
            settype(e.target.value);
          }}
        ></input>
        <input
          type="text"
          className="form-control"
          placeholder="Image URL 1"
          value={Imageurl1}
          onChange={(e) => {
            setImageurl1(e.target.value);
          }}
        ></input>
        <input
          type="text"
          className="form-control"
          placeholder="Image URL 2"
          value={Imageurl2}
          onChange={(e) => {
            setImageurl2(e.target.value);
          }}
        ></input>
        <input
          type="text"
          className="form-control"
          placeholder="Image URL 3"
          value={Imageurl3}
          onChange={(e) => {
            setImageurl3(e.target.value);
          }}
        ></input>

        <div className="text-right">
          <button className="btn btn-primary mt-2" onClick={AddRoom}>
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default Adminscreen;
