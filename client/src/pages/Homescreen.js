import React, { useState, useEffect } from "react";
import axios from "axios";
import Rooms from "../components/Rooms";
import Loader from "../components/Loader";

import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(true);  // Initialize loading to true
  const [error, seterror] = useState(false);     // Initialize error to false

  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState([]);
  const[searchkey,setsearchkey] = useState('');
  const[type,settype] = useState('all') 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const response = await axios.get("http://localhost:3000/api/products");
        setrooms(response.data.myData);
        setduplicaterooms(response.data.myData);
        setloading(false);  // Set loading to false after data is fetched
      } catch (error) {
        seterror(true);
        setloading(false);  // Set loading to false even if there's an error
        console.error(error);
      }
    };
    fetchData();
  }, []);

  function filterByDate(dates) {
    setfromdate((dates[0]).format("DD-MM-YYYY"));
    settodate((dates[1]).format("DD-MM-YYYY"));
    const temprooms = [];
    let availability = false;
    for (const room of duplicaterooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            !(dates[0]).isBetween(booking.fromdate, booking.todate, null, '[]') &&
            !(dates[1]).isBetween(booking.fromdate, booking.todate, null, '[]')
          ) {
            if (
              (dates[0]).format("DD-MM-YYYY") !== booking.fromdate &&
              (dates[0]).format("DD-MM-YYYY") !== booking.todate &&
              (dates[1]).format("DD-MM-YYYY") !== booking.fromdate &&
              (dates[1]).format("DD-MM-YYYY") !== booking.todate
            ) {
              availability = true;
            }
          }
        }
      } else {
        availability = true;
      }

      if (availability==true || room.currentbookings.length==0) {
        temprooms.push(room);
      }
    }
    setrooms(temprooms);
  }

  function filterBysearch(){
    const temprooms = duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))
    setrooms(temprooms);
  }

  function filterByType(e){
    if(e!== 'all'){
      const temprooms = duplicaterooms.filter(room=>room.type.toLowerCase()==e.toLowerCase())
      setrooms(temprooms);
    }
    else{
      setrooms(duplicaterooms);
    }
  }

  return (
    <div className="container">
      <div className="row mt-4 search">
        <div className="col-md-3 date">
        <div className="datepicker">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
        </div>
        <div className="col-md-7 date">
          <input type="text" className="bar" placeholder="search rooms" value={searchkey} onChange={(e)=>{
            setsearchkey(e.target.value);
          }} onKeyUp={filterBysearch}
          ></input>
          
        </div>
        <div className="col-md-1.5 date">
        <select className="bar" value={type} onChange={(e)=>{filterByType(e.target.value)}}>
          <option value="all">All</option>
          <option value="delux">delux</option>
          <option value="non-delux">non-delux</option>
        </select>
        </div>
      </div>

      <div className="col">
        {loading ? (
          <Loader />
        ) :  (
          rooms.map((room) => (
            <div className="temp" key={room._id}>
              <Rooms room={room} fromdate={fromdate} todate={todate} />
            </div>
          ))
      
        ) }
      </div>
    </div>
  );
}

export default Homescreen;
