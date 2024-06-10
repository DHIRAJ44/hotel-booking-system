// const express = require("express");
// const router = express.Router();
// const Room = require("../models/room.js")

// router.get("/getallrooms",async(req,res) =>{
//     try{
//     const rooms = await Room.find({})
//     res.send(rooms)   
//     }catch(eroor){
//         return res.status(400).json({ message: error});
//     }
// });

// module.exports = router

const express = require('express')
const router = express.Router();
const {getallrooms,getallroomstesting,getaddroom} = require("../controller/products");

router.route('/').get(getallrooms);
router.route('/getproductsbyid').post(getallroomstesting);
router.route('/addroom').post(getaddroom);


module.exports = router




