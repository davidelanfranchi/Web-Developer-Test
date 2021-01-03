import { toast } from "react-toastify";

const notify = (notification) => {
  switch (notification) {
    case "MINIMUM_QUANTITY":
      toast(
        "You must have a minimum of 1 product. Please, use the delete button if you want to remove it.",
        {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2000,
          toastId: "MINIMUM_QUANTITY",
        }
      );
      break;
    case "STOCK_LEVEL":
      toast(
        "Hooray! You reached the top of our stock. Please, get in touch directly with us to know if we can satisfy your desires.",
        {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2000,
          toastId: "STOCK_LEVEL",
        }
      );
      break;
    default:
      console.warn("The function needs a notification name");
  }
};

export default notify;
