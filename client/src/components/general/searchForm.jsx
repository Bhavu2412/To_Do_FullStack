import React from "react";
import { useState } from "react";
import axios from "axios";
import Popup from "./Popup";
export default function Form({ jwtToken }) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({ title: "", done: false, description: "" });
  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    sendData(data);
    if (!jwtToken) {
      setShow(true);
    }
  }
  const sendData = () => {
    if (jwtToken) {
      axios
        .post("http://localhost:8080/create", data, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((res) => {
          setData({ title: "", done: false, description: "" });
        })
        .catch((err) => {});
    }
  };
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Enter task here!</h1>
        <div className="input-form">
          <input
            className="input-searchForm"
            placeholder="Enter Tasks..."
            value={data.title}
            name="title"
            onChange={handleChange}
          />
          <textarea
            cols={50}
            rows={10}
            className="input-searchForm-description"
            placeholder="Enter Tasks Description..."
            value={data.description}
            name="description"
            onChange={handleChange}
          />
        </div>

        <button className="button-form" type="submit">
          <b>Submit</b>
        </button>
      </form>
      {show && (
        <Popup
          title={"No user found."}
          message={" Login first !!!"}
          setShow={setShow}
          show={show}
        />
      )}
    </>
  );
}
