import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("cuurentUser"));
  function logout() {
    localStorage.removeItem("cuurentUser");
    window.location.href = "/login";
  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark  navbar1">
        <div class="container ">
          <a class="navbar-brand title" href="/home">
            SheyRoom
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              {user ? (
                <div>
                  <div class="dropdown ">
                    <a
                      class="btn btn-dark dropdown-toggle"
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fas fa-user me-1"></i>
                      {user.name}
                    </a>

                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <li>
                        <a class="dropdown-item" href="/profile">
                          Profile
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#" onClick={logout}>
                          Log Out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div>
                  <li
                    class="nav-item "
                    style={{ display: "inline-block", marginRight: "1rem" }}
                  >
                    <Link
                      class="nav-link active"
                      aria-current="page"
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                  <li class="nav-item" style={{ display: "inline-block" }}>
                    <Link
                      class="nav-link active"
                      aria-current="page"
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
