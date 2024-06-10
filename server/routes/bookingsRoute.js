const express = require("express");
const router = express.Router();
const {
  getbooking,
  verifyPayment,
  getbookingbyid,
  getcancelbooking,
  getallbookings,
} = require("../controller/booking");

router.route("/bookingroom").post(getbooking);
router.route("/verify-payment").post(verifyPayment);

router.route("/getbookingbyuserid").post(getbookingbyid);
router.route("/cancelbooking").post(getcancelbooking);
router.route("/getallbookings").get(getallbookings);
module.exports = router;
