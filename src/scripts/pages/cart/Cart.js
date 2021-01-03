import React, { useState, useEffect, Fragment } from "react";
import cloneDeep from "lodash.clonedeep";

import "./Cart.scss";

import Button from "./../../components/ui/Button";
import TopBar from "../../components/layout/TopBar";

import CartTextBlock from "./CartTextBlock";
import CartTable from "./CartTable";
// import CartSubmit from "./CartSubmit";
import CartMessage from "./CartMessage";

import { getSubtotal, getVat, getTotal } from "./utilities";

function Cart(props) {
  const [hasFetchedData, setIsHasFetchedData] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);
  const [cartData, setCartData] = useState({
    items: [],
    subtotal: 0,
    vat: 0,
    total: 0,
    canBeSubmitted: false,
  });

  useEffect(() => {
    fetch(process.env.CART_ITEMS_ENDPOINT)
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
      hasBeenSubmitted: false,
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
        newItems = newItems
          .slice(0, itemIndex)
          .concat(newItems.slice(itemIndex + 1, newItems.length));
        break;
      default:
        console.warn("The function needs a action name");
    }

    updateCartDataState(newItems);
  }

  function submitCartData() {
    if (!cartData.canBeSubmitted) {
      return;
    }
    setIsSubmitting(true);

    fetch(process.env.CART_SUBMIT_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(cartData.items),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsSubmitting(false);
        setHasBeenSubmitted(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="Cart">
      <div className="Cart__main">
        <TopBar />
        <CartTextBlock />

        {hasFetchedData ? (
          <div className={isSubmitting ? "is-submitting" : ""}>
            <CartTable cartData={cartData} updateCartData={updateCartData} />
            {!hasBeenSubmitted && (
              <div className="Cart__submit">
                <Button
                  label="Buy now"
                  isDisabled={!cartData.canBeSubmitted}
                  onClickHandler={submitCartData}
                  hasSpinner={isSubmitting}
                />
              </div>
            )}
            {!cartData.canBeSubmitted && (
              <CartMessage
                heading="Your basket is now empty"
                message="Please, visit our listing page and get
                inspired by latest casual and street wear looks."
              />
            )}
            {hasBeenSubmitted && (
              <CartMessage
                heading="End with a bang your purchase!"
                message="Give our developers more time to develop
        our amazing UI and come back soon to finish your shopping process."
              />
            )}
          </div>
        ) : (
          // <CartLoading />
          <CartTable isLoading={true} />
        )}
      </div>
    </div>
  );
}

export default Cart;
