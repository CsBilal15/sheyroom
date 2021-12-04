import React, { useState } from "react";
import Loader from "../Component/Loader";
import Errorr from "../Component/Error";
import Success from "../Component/Success";
import axios from "axios";
const RegisterScreen = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [success, setSuccess] = useState();

  const register = async () => {
    if (password == cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };
      try {
        setloading(true);
        const result = (await axios.post("/api/users/register", user)).data;
        setloading(false);
        setSuccess(true);
        setname("");
        setemail("");
        setpassword("");
        setcpassword("");
      } catch (error) {
        setloading(false);
        console.log(error);
        seterror("true");
      }
      console.log(user);
    } else {
      alert("password not match");
    }
  };
  return (
    <div>
      {loading && <Loader />}
      {error && <Errorr />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-7 col-11">
          {success && <Success messege="Thanks For Resgistration " />}
          <div className="bs">
            <h1 className="text-center text-capitalize">Register</h1>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
              placeholder="Please Enter Your Name"
            />
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              placeholder="Please Enter Your Email"
            />
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              placeholder="Please Enter Your Password"
            />
            <input
              type="password"
              className="form-control"
              value={cpassword}
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
              placeholder="Please Enter Your Confirm Password"
            />
            <button className="btn btn-dark mt-3" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
