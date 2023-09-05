import React from "react";

export default function AboutTem({ title, description }) {
  return (
    <div className="about-container">
      <h1 className="about-head">{title}</h1>
      <p className="description-about">{description}</p>
    </div>
  );
}
