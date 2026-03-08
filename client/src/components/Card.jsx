import React from "react";
import "./styles/card.css";
export default function Card(props) {
  const { logo, title, discreption } = props;
  return (
    <>
      <div className="container_carte">
        <div className="icon_place">
            {logo}
        </div>
        <div className="text_place">
          <h2>
            {title}
          </h2>
          <p>
            {discreption}
          </p>
        </div>
      </div>
    </>
  );
}
