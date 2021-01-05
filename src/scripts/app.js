// Scripts start here

import "remove-focus-outline";

import mockApi from "./mockApi";
if (process.env.USE_MOCK_API === "true") {
  mockApi.init();
}

import React from "react";
import ReactDOM from "react-dom";
import TopBar from "./components/layout/TopBar";
ReactDOM.render(<TopBar />, document.getElementById("topbar"));

import cart from "./pages/cart";
if (document.getElementById("cart")) {
  cart.init();
}
