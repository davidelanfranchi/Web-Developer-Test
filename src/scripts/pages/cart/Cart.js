import React, { useState, useEffect, Fragment } from "react";
import cloneDeep from "lodash.clonedeep";

import "./Cart.scss";
import TopBar from "../../layout/TopBar";
import CartTextBlock from "./CartTextBlock";
import CartLoading from "./CartLoading";
import CartTable from "./CartTable";
import CartEmpty from "./CartEmpty";
import CartSubmit from "./CartSubmit";

import { getSubtotal, getVat, getTotal } from "./utilities";

function Cart(props) {
  const [hasFetchedData, setIsHasFetchedData] = useState(false);
  const [cartData, setCartData] = useState({
    items: [],
    subtotal: 0,
    vat: 0,
    total: 0,
    canBeSubmitted: false,
  });

  useEffect(() => {
    fetch(process.env.API_CART_ENDPOINT)
      .then((response) => response.json())
      .then(({ items }) => {
        setIsHasFetchedData(true);
        updateCartDataState(items);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  function updateCartDataState(items) {
    setCartData({
      items: items,
      subtotal: getSubtotal(items),
      vat: getVat(items),
      total: getTotal(items),
      canBeSubmitted: items.length ? true : false,
    });
  }

  function updateCartData(action, sku, quantity) {
    const itemIndex = cartData.items.findIndex((item) => item.sku === sku);
    let newItems = cloneDeep(cartData.items);

    switch (action) {
      case "DECREASE":
        if (quantity >= 1) {
          newItems[itemIndex].quantity = quantity;
        } else {
          console.warn("Minimun quantity");
        }
        break;
      case "INCREASE":
        if (quantity <= newItems[itemIndex].stockLevel) {
          newItems[itemIndex].quantity = quantity;
        } else {
          console.warn("More than stock level");
        }
        break;

      case "ADJUST":
        if (quantity <= newItems[itemIndex].stockLevel) {
          newItems[itemIndex].quantity = quantity;
        } else {
          console.warn("More than stock level");
        }
        break;
      case "DELETE":
        console.log("rem " + sku);
        console.log(itemIndex);
        newItems = newItems
          .slice(0, itemIndex)
          .concat(newItems.slice(itemIndex + 1, newItems.length));
        break;
      default:
        console.warn("The function needs a action name");
    }

    updateCartDataState(newItems);
  }

  return (
    <div className="Cart">
      <div className="Cart__main">
        <TopBar />
        <CartTextBlock />

        {hasFetchedData ? (
          <Fragment>
            <CartTable cartData={cartData} updateCartData={updateCartData} />
            <CartSubmit canBeSubmitted={cartData.canBeSubmitted} />
            {!cartData.canBeSubmitted && <CartEmpty />}
          </Fragment>
        ) : (
          <CartLoading />
        )}
      </div>
    </div>
  );
}

export default Cart;
