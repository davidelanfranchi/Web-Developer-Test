import React from "react";

import "./Cart.scss";
import TopBar from "../../layout/TopBar";
import CartTextBlock from "./CartTextBlock";

function Cart(props) {
  return (
    <div className="Cart">
      <div className="Cart__main">
        <TopBar />
        <CartTextBlock />
      </div>
    </div>
  );
}

export default Cart;
