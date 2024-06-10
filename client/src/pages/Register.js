import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import Success from "../components/Success";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
const [userType,setUserType]=useState("");
 
async function register() {
  if (password === cpassword) {
    const user = {
      name,
      email,
      password,
      isAdmin: userType === 'admin' ? true : false,
    };
    try {
      setLoading(true);
      setError(false); // Reset error state
      setSuccess(false); // Reset success state
      await axios.post(
        "http://localhost:3000/api/users/register",
        { user },
        { withCredentials: true }
      );
      setLoading(false);
      setSuccess(true);
      setName("");
      setEmail("");
      setPassword("");
      setCpassword("");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  } else {
    alert("Passwords do not match");
  }
}
  return (
    <div>
      {loading && <Loader />}

      <div className="landing1">
        <div className="img2">
        {error && <Error message="Registration failed. Please try again." />}
          {success && <Success message="Registration successful" />}
          <div className="register">
            <h2 className="jeet">Register</h2>
            <div className="rbtn">
            <div className="radi">
              <input
              className="ibtn"
              type="radio"
              name="usertype"
              value='user'
              onChange={(e)=>setUserType(e.target.value)}
              />
              User
              </div>
              <div className="radio">
              <input type="radio"
              name="usertype"
              value='admin'
              onChange={(e)=>setUserType(e.target.value)}
              className="bbtn"
              />
              Admin
              </div>
            </div>
            <input
              type="text"
              className="boxx"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="boxx"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="boxx"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="boxx"
              placeholder="Confirm Password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            />
            <button className="btn btn-primary but" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;