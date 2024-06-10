import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";
import moment from "moment";

function Bookingscreen() {
  const { roomid, fromdate, todate } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDays, setTotalDays] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      window.location.href = "/login";
    }

    const fetchRoomData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:3000/api/products/getproductsbyid",
          { roomid },
          { withCredentials: true }
        );
        setRoom(response.data.myData);
        const days =
          moment(todate, "DD-MM-YYYY").diff(
            moment(fromdate, "DD-MM-YYYY"),
            "days"
          ) + 1;
        setTotalDays(days);
        setTotalAmount(response.data.myData.rentperday * days);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    };
    fetchRoomData();
  }, [roomid, fromdate, todate]);

  async function onToken() {
    const token = JSON.parse(localStorage.getItem("currentUser"));
    console.log(token);
    setLoading(true);
    const bookingDetails = {
      room,
      userid: token._id,
      fromdate,
      todate,
      totalamount: totalAmount,
      totaldays: totalDays,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/bookings/bookingroom",
        { bookingDetails },
        { withCredentials: true }
      );
      // const options = {
      //   key: "rzp_test_PyspEyHmknTGyV", // Enter the Key ID generated from the Dashboard
      //   amount: `${response.data.order.amount}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      //   currency: "INR",
      //   name: "Acme Corp",
      //   description: "Test Transaction",
      //   image: "https://example.com/your_logo",
      //   order_id: `${response.data.order.id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      //   callback_url: "http://localhost:3000/api/bookings/verify-payment",
      //   prefill: {
      //     name: "Gaurav Kumar",
      //     email: "gaurav.kumar@example.com",
      //     contact: "9000090000",
      //   },
      //   notes: {
      //     address: "Razorpay Corporate Office",
      //   },
      //   theme: {
      //     color: "#3399cc",
      //   },
      // };
      var options = {
        key: "rzp_test_cRB14SrUKnVbVE", // Enter the Key ID generated from the Dashboard
        amount: `${response.data.order.amount}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: `${response.data.order.id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          await axios
            .post(
              "http://localhost:3000/api/bookings/verify-payment",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                bookingDetails,
              },
              { withCredentials: true }
            )
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const payment = new window.Razorpay(options);
      payment.open();

      setLoading(false);
    } catch (error) {
      setLoading(false);
      Swal.fire("Oops", "Something went wrong", "error");
      console.error("Booking error:", error);
    }
  }

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : room ? (
        <div className="book">
          <div className="books">
            <div className="imagee">
              <h1 className="bold">{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg"/>
            </div>
            <div className="details">
              <div style={{ textAlign: "right" }}>
                <h1 className="bold">Booking details</h1>
                <hr />
                <b>
                  <p>
                    Name: {JSON.parse(localStorage.getItem("currentUser")).name}
                  </p>
                  <p>From Date: {fromdate}</p>
                  <p>To Date: {todate}</p>
                  <p>Max Count: {room.maxcount}</p>
                </b>
              </div>

              <div className="amount" style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount:</h1>
                  <hr />
                  <p>Total days: {totalDays}</p>
                  <p>Rent per day: {room.rentperday}</p>
                  <p>Total amount: {totalAmount}</p>
                </b>
              </div>
              <div className="token" style={{ float: "right" }}>
                <button onClick={onToken} className="butn btn-primary">
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
