import React from "react";

import "./CartTextBlock.scss";

function CarTextBlock(props) {
  return (
    <div className="CarTextBlock">
      <h1 className="CarTextBlock__heading">Your Basket</h1>
      <p className="CarTextBlock__body">
        Items you have added to your basket are shown below. Adjust the
        quantities or remove items before continuing purchase.
      </p>
    </div>
  );
}

export default CarTextBlock;
