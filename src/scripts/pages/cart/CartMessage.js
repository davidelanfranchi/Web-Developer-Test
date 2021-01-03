import React from "react";

import "./CartMessage.scss";

function CartSubmitted(props) {
  return (
    <div className="CartMessage">
      <div className="CartMessage__panel">
        <h2 className="CartMessage__heading">{props.heading}</h2>
        <p className="CartMessage__message">{props.message}</p>
      </div>
    </div>
  );
}

export default CartSubmitted;
