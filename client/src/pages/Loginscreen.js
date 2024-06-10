import React, { useEffect, useState } from "react";
import "./Register.css";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
    async function Login() {
      const user = {
        email,
        password,
      };
      try {
        setLoading(true);
        const result = await axios.post(
          "http://localhost:3000/api/users/login",
          { user },
          { withCredentials: true }
        );
        setLoading(false);
        localStorage.setItem("currentUser", JSON.stringify(result.data));
        const isAdmin = result.data.isAdmin;
    
        // Redirect based on user type
        if (isAdmin) {
          window.location.href = "/admin"; // Redirect to admin dashboard
        } else {
          window.location.href = "/home"; // Redirect to user dashboard
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }
      
  return (
    <div>
      {loading && <Loader />}
      <div className="landing2">
        <div className="image3">
          {error && <Error message="Invalid Credentionals" />}
          {success && <Success message="Login successful" />}
          <div className="register1">
            <h2 className="jeet1">Login</h2>
            <input
              type="text"
              className="boxx1"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="text"
              className="boxx1"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <button className="btn btn-primary but1" onClick={Login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;