const Booking = require("../models/booking.js");
const Room = require("../models/room.js");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const moment = require("moment");

const Razorpay = require("razorpay");

const getbooking = async (req, res) => {
  const { bookingDetails } = req.body;

  if (!bookingDetails) {
    return res.status(400).json({ error: "Missing booking details" });
  }

  const instance = new Razorpay({
    key_id: "rzp_test_cRB14SrUKnVbVE",
    key_secret: "RumeG9AKUDDD4i8yTsy8nMjT",
  });

  const options = {
    amount: bookingDetails.totalamount * 100,
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  res.status(200).json({ order });
};

const verifyPayment = async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    bookingDetails,
  } = req.body;

  const { room, userid, fromdate, todate, totalamount, totaldays } =
    bookingDetails;

  const generated_signature = crypto
    .createHmac("sha256", "RumeG9AKUDDD4i8yTsy8nMjT")
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature == razorpay_signature) {
    console.log(bookingDetails);
    const booking = new Booking({
      roomid: room._id,
      userid,
      fromdate,
      todate,
      totalamount,
      razorpay_payment_id,
      razorpay_order_id,
      status: "Booked",
    });
    booking.save(); 
    res.status(200).json({ payment: "Successful" });
  } else {
    res.status(500).json({ payment: "Unsuccessful" });
  }
};

const getbookingbyid = async (req, res) => {
  const { userid } = req.body;
  try {
    const bookings = await Booking.find({ userid: userid });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
};
const getcancelbooking = async (req, res) => {
  const { bookingid, roomid } = req.body;
  await Booking.findOneAndDelete({ _id: bookingid });

  res.send("Booking Cancelled");
};

const getallbookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
};
module.exports = {
  getbooking,
  verifyPayment,
  getbookingbyid,
  getcancelbooking,
  getallbookings,
};
