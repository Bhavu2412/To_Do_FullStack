import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../general/Popup";

export default function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState({ succ: false, err: false });
  const [res, setRes] = useState({ succ: "", err: "" });
  const [data, setData] = useState({ InputValue: "", password: "" });

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };
  function handleSignupClick() {
    navigate("/signup");
  }
  function handleForgetClick() {
    navigate("/forpass");
  }
  function handleInput(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const { InputValue, password } = data;
    if (validateEmail(InputValue)) {
      sendData("email", password);
    } else {
      sendData("username", password);
    }
  }
  function sendData(value, password) {
    console.log(value + " " + password);
    axios
      .post("https://node-fullstack-2zaj.onrender.com/login", {
        [value]: data.InputValue,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("name", res.data.user_name);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("password", res.data.passlen);
        localStorage.setItem("token", res.data.token);
        setShow({ ...show, succ: true });
        setRes({ ...res, succ: res.data.message });
        setTimeout(() => {
          window.location = "http://localhost:3000/";
        }, 3000);
      })
      .catch((err) => {
        setShow({ ...show, err: true });
        setRes({ ...res, err: err.response.data.message });
        //setErr(err.response.data.message);
      });
  }
  return (
    <>
      <div className="container-login">
        <h1 id="head">
          <b>Login to ToDo</b>
        </h1>
        <br />

        <br />
        <hr width="425vw" />
        <br />
        <div className="login" id="login">
          <form onSubmit={handleSubmit}>
            <p id="email">
              {" "}
              <b className="signup-text">Email or username</b>
            </p>
            <input
              id="inpemail"
              type="text"
              value={data.InputValue}
              name="InputValue"
              onChange={handleInput}
            />
            <p id="pass">
              {" "}
              <b className="signup-text">Password</b>
            </p>
            <input
              id="inppass"
              type="password"
              name="password"
              value={data.password}
              onChange={handleInput}
            />
            <br />
            <button type="submit" id="submit">
              <b>Log in </b>
            </button>
            <br />
            <br />
            <p className="forget" onClick={handleForgetClick}>
              <b id="signup">Forgot Password? </b>
            </p>
            <br />
          </form>
          <hr width="425vw" />
        </div>
        <br />
        <div className="signup">
          <p id="don">
            <b>Don't have an account? </b>
          </p>
          <p id="signup" onClick={handleSignupClick}>
            <b>Sign up for ToDo</b>
          </p>
        </div>
      </div>
      {show.succ && <Popup title={res.succ} show={show} setShow={setShow} />}
      {show.err && <Popup title={res.err} show={show} setShow={setShow} />}
    </>
  );
}
