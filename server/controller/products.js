const Room = require("../models/room.js");

// Function to get all rooms
const getallrooms = async (req, res) => {
  try {
    const myData = await Room.find({});
    res.status(200).json({ myData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching rooms", error: error.message });
  }
};

// Function to get a specific room by ID
const getallroomstesting = async (req, res) => {
  const { roomid } = req.body;
  try {
      const myData = await Room.findOne({ _id: roomid });
      res.status(200).json({ myData });
  } catch (error) {
      return res
          .status(500)
          .json({ message: "Error fetching room", error: error.message });
  }
};





const getaddroom=async(req,res)=>{
  try{
      const newroom = new Room(req.body.newroom)
      await newroom.save()
      res.send('new room added successfully')
  }catch(error){
      return res.status(400).json({error});
  }
}


module.exports = {
  getallrooms,
  getallroomstesting,
  getaddroom
};
