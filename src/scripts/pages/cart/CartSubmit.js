import React from "react";

import "./CartSubmit.scss";

function CartSubmit(props) {
  return (
    <div className="CartSubmit">
      <button className="CartSubmit__btn" disabled={!props.canBeSubmitted}>
        Buy Now
      </button>
    </div>
  );
}

export default CartSubmit;
