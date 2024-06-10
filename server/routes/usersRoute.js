const express=require("express");
const router=express.Router();
const {getregister,getlogin,getallusers} = require("../controller/userinfo");
router.route('/register').post(getregister);
router.route('/login').post(getlogin);
router.route('/getallusers').post(getallusers);
module.exports = router