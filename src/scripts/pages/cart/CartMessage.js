import React from "react";

import "./CartMessage.scss";

function CartSubmitted(props) {
  return (
    <div className="CartMessage">
      <h2 className="CartMessage__heading">{props.heading}</h2>
      <p className="CartMessage__message">{props.message}</p>
    </div>
  );
}

export default CartSubmitted;
