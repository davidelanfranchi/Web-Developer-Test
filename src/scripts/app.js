// Scripts start here

import mockApi from "./mockApi";
if (process.env.USE_MOCK_API === "true") {
  mockApi.init();
}

import cart from "./pages/cart";
if (document.getElementById("cart")) {
  cart.init();
}
