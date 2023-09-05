import axios from "axios";
import React, { useState } from "react";
import { FaFacebook, FaGoogle, FaApple, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Popup from "../general/Popup";
export default function Signup() {
  const navigate = useNavigate();
  const [show, setShow] = useState({ succ: false, err: false });
  const [res, setRes] = useState({ succ: "", err: "" });
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
    date: "",
    name: "",
  });
  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }
  function handleClick() {
    navigate("/login");
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendData(data);
  }
  function sendData(d) {
    axios
      .post("https://node-todofullstack.onrender.comsignup", data)
      .then((resp) => {
        setRes({ ...res, succ: resp.data.message });
        setShow({ ...show, succ: true });
        setTimeout(() => {
          window.location = "http://localhost:3000/login";
        }, 3000);
      })
      .catch((err) => {
        setRes({ ...res, err: err.response.data.message });
        setShow({ ...show, err: true });
      });
  }
  return (
    <>
      <div className="container-signup">
        <h1 id="head">
          <b>Signup to ToDo</b>
        </h1>
        <br />
        <hr width="90%" />

        <div className="login" id="login">
          <form onSubmit={handleSubmit} id="signup-form">
            <p id="email" className="signup-text">
              {" "}
              <b>What's your Email address?</b>
            </p>

            <input
              id="inpemail"
              type="email"
              value={data.email}
              name="email"
              onChange={handleInputChange}
            />
            <p id="email" className="signup-text">
              {" "}
              <b>What's should we call you?</b>
            </p>
            <input
              id="inpemail"
              type="text"
              value={data.name}
              name="name"
              onChange={handleInputChange}
            />
            <p id="username" className="signup-text">
              <b>Give a unique username to yourself</b>
            </p>
            <input
              id="inpemail"
              type="text"
              value={data.username}
              name="username"
              onChange={handleInputChange}
            />
            <p id="pass" className="signup-text">
              {" "}
              <b>Create a Password</b>
            </p>
            <input
              id="inppass"
              type="password"
              value={data.password}
              name="password"
              onChange={handleInputChange}
            />
            <p id="dob" className="signup-text">
              {" "}
              <b>Enter your date of birth</b>
            </p>
            <input
              type="date"
              id="day"
              name="day"
              value={data.date}
              onChange={handleInputChange}
            />
            <button type="submit" id="submit">
              <b>Signup</b>
            </button>
          </form>
          <br />
          <br />
        </div>
        <br />

        <hr width="70%" />
        <div className="signup">
          <p id="don">
            <b>Have an account? </b>
          </p>
          <p id="signup" onClick={handleClick}>
            <b>Login</b>
          </p>
        </div>
      </div>
      {show.succ && <Popup title={res.succ} show={show} setShow={setShow} />}
      {show.err && <Popup title={res.err} show={show} setShow={setShow} />}
    </>
  );
}
