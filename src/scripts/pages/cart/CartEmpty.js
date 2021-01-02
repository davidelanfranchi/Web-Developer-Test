import React from "react";

import "./CartEmpty.scss";

function CartEmpty(props) {
  return (
    <div className="CartEmpty">
      <p className="CartEmpty__message">
        Your basket is now empty. Please, visit our listing page and get
        inspired by latest casual and street wear looks.{" "}
        <a href="#">Start shopping now</a>
      </p>
    </div>
  );
}

export default CartEmpty;
