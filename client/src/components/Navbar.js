import React from "react";
import "./Navbar.css";

import { useState } from "react";
function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  }

  const [showOptions, setShowOptions] = useState(false);
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <a class="navbar-brand" href="/home">
          Dom Discovery
        </a>
        <button
          onClick={() => {
            setShowOptions(!showOptions);
          }}
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon">
            <i class="fa-solid fa-bars" style={{ color: "white" }}></i>
          </span>
        </button>
        <div
          class={`collapse navbar-collapse ${showOptions ? "show" : ""}`}
          id="navbarNav"
        >
          <ul class="navbar-nav mr-5">
            {user ? (
              <>
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="fa fa-user"></i>
                    {user.name}
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a class="dropdown-item" href="/profile">
                      Profile
                    </a>
                    <a class="dropdown-item" href="#" onClick={logout}>
                      Logout
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <li class="nav-item">
                  <a class="nav-link" href="/Register">
                    Register
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/Login">
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
