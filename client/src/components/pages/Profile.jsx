import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import Popup from "../general/Popup";
export default function Profile({ jwtToken }) {
  const [show, setShow] = useState(false);
  const passnum = localStorage.getItem("password");
  let pass = "";

  for (var i = 0; i < passnum - 1; i++) {
    pass = pass + "*";
  }

  return (
    <div className="container-profile">
      <div className="photo-profile">
        <div className="photo">
          <FontAwesomeIcon icon={faUser} size="1x" />
        </div>
      </div>
      <div className="detail-profile">
        <h1 className="profile-head">PROFILE</h1>

        <div className="profile-info">
          <p className="para-profile">
            Email :
            <p className="ani-profile-name">
              {" "}
              {localStorage.getItem("email")}{" "}
            </p>
          </p>

          <p className="para-profile">
            Username :{" "}
            <p className="ani-profile-name">
              {" "}
              {localStorage.getItem("username")}{" "}
            </p>
          </p>

          <p className="para-profile">
            Name :{" "}
            <p className="ani-profile-name">{localStorage.getItem("name")}</p>
          </p>

          <p className="para-profile">
            Password :<p className="ani-profile-name"> {pass} </p>
          </p>
        </div>
      </div>
      {!jwtToken && (
        <Popup
          title={"No user found."}
          message={" Login first !!!"}
          setShow={setShow}
          show={show}
        />
      )}
    </div>
  );
}
