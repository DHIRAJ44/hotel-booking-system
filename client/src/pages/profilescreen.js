import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";
import { Tabs } from "antd";
import { Tag, Divider } from "antd";
const { TabPane } = Tabs;

const ProfileScreen = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>My Profile</h1>
          <br />
          <h1>Name: {user.name}</h1>
          <h1>Email: {user.email}</h1>
          <h1>isAdmin: {user.isAdmin ? "YES" : "NO"}</h1>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProfileScreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setBookings] = useState([]);
  const [loading, setloading] = useState(false); // Initialize loading to true
  const [error, seterror] = useState(); // Initialize error to false
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setloading(true);
        const response = await axios.post(
          "http://localhost:3000/api/bookings/getbookingbyuserid",
          { userid: user._id },
          { withCredentials: true }
        );
        setBookings(response.data);
        setloading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setloading(false);
      }
    };
    fetchBookings();
  }, []);
  async function cancelBooking(bookingid, roomid) {
    try {
      setloading(true);
      const result = await axios.post(
        "http://localhost:3000/api/bookings/cancelbooking",
        {
          bookingid,
          roomid,
        },
        { withCredentials: true }
      );
      console.log(result.data);
      setloading(false);
      Swal.fire("congrats", "your booking has been cancelled", "success").then(
        (result) => {
          window.location.reload();
        }
      );
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setloading(false);
    }
  }
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader></Loader>}
          {bookings &&
            bookings.map((booking) => {
              return (
                <div className="">
                  <h1>{booking.room}</h1>
                  <p>
                    <b>booking id:</b> {booking._id}
                  </p>
                  <p>
                    <b>checkin :</b> {booking.fromdate}
                  </p>
                  <p>
                    <b>checkout: </b> {booking.todate}
                  </p>
                  <p>
                    <b>Amount : </b>
                    {booking.totalamount}
                  </p>
                  <p>
                    <b>Status : </b>{" "}
                    {booking.status == "Cancelled" ? (
                      <Tag color="red">CANCELLED</Tag>
                    ) : (
                      <Tag color="green">CONFIRMED</Tag>
                    )}
                  </p>
                  {booking.status !== "cancelled" && (
                    <div className="text">
                      <buttom
                        class="btn btn-primary"
                        onClick={() => {
                          cancelBooking(booking._id, booking.roomid);
                        }}
                      >
                        CANCEL BOOKING
                      </buttom>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
