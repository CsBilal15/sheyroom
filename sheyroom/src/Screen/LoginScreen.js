import React, { useState } from "react";
import Loader from "../Component/Loader";
import Errorr from "../Component/Error";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginScreen = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const login = async () => {
    const user = {
      email,
      password,
    };
    try {
      setloading("true");
      const result = (await axios.post("/api/users/login", user)).data;
      setloading("false");
      localStorage.setItem("cuurentUser", JSON.stringify(result));
      window.location.href = "/home";
    } catch (error) {
      setloading(false);

      seterror(true);
      console.log(error);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-7 col-11">
          {error && <Errorr messege="Invalid Details" />}
          <div className="bs">
            <h1 className="text-center text-capitalize">Login</h1>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              placeholder="Enter Your Email"
            />
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              placeholder="Enter Your Password"
            />
            <button className="btn btn-dark mt-3" onClick={login}>
              Log In
            </button>
            <p className="pararegis mt-3">
              If You Not Register Then Regiter First.
            </p>
            <Link to="/register">
              <button className="btn btn-dark mt-1">Register Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
