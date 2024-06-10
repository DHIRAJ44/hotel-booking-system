const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    // room: {
    //   type: String,
    //   required: true,
    // },
    roomid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fromdate: {
      type: String,
      required: true,
    },
    todate: {
      type: String,
      required: true,
    },
    totalamount: {
      type: Number,
      required: true,
    },
    // TransactionId: {
    //   type: String,
    //   required: true,
    // },
    razorpay_payment_id: {
      type: String,
      required: true,
    },
    razorpay_order_id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Booked", "Pending", "Cancelled"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
