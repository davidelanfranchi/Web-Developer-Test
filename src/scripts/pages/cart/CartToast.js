import React from "react";

import { ToastContainer, Slide, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.minimal.css";
import "react-toastify/dist/ReactToastify.css";

import "./CartToast.scss";

function CartToast(props) {
  return (
    <ToastContainer
      autoClose={100000}
      transition={Slide}
      className="CartToast__container"
      toastClassName="CartToast__toast"
      bodyClassName="CartToast__body"
      progressClassName="CartToast__progress"
    />
  );
}

export const notify = (notification) => {
  switch (notification) {
    case "MINIMUM_QUANTITY":
      toast(
        "You must have a minimum of 1 product. Please, use the delete button if you want to remove it.",
        {
          position: toast.POSITION.BOTTOM_CENTER,
          toastId: "MINIMUM_QUANTITY",
        }
      );
      break;
    case "STOCK_LEVEL":
      toast(
        "Hooray! You reached the top of our stock. Please, get in touch directly with us to know if we can satisfy your desires.",
        {
          position: toast.POSITION.BOTTOM_CENTER,
          toastId: "STOCK_LEVEL",
        }
      );
      break;
    default:
      console.warn("The function needs a notification name");
  }
};

export default CartToast;
