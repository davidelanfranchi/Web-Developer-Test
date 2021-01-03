import React from "react";

import "./Button.scss";

function Button(props) {
  return (
    <button
      className={`Button ${props.hasSpinner ? "has-spinner" : ""}`}
      disabled={props.isDisabled}
      onClick={props.onClickHandler}
    >
      Buy Now
      {props.hasSpinner && <span className="Button__spinner"></span>}
    </button>
  );
}

export default Button;
