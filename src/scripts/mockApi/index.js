import Pretender from "pretender";
import cartItems from "./cartItems.json";

function init() {
  const server = new Pretender();

  // All request have a 1500ms delay to seem more real

  server.get(
    process.env.CART_ITEMS_ENDPOINT,
    (request) => {
      return [
        200,
        { "content-type": "application/json" },
        JSON.stringify(cartItems),
      ];
    },
    1500
  );

  server.post(
    process.env.CART_SUBMIT_ENDPOINT,
    (request) => {
      return [
        200,
        { "content-type": "application/json" },
        JSON.stringify({
          status: "success",
          data: {},
          message: "Cart submitted with success",
        }),
      ];
    },
    1500
  );

  // Ignore other request, particularly webpack HMR ones

  server.unhandledRequest = function (verb, path, request) {
    const xhr = request.passthrough(); // <-- A native, sent xhr is returned

    xhr.onloadend = (ev) => {
      console.warn(`Response for ${path}`, {
        verb,
        path,
        request,
        responseEvent: ev,
      });
    };
  };
}

export default {
  init: init,
};
