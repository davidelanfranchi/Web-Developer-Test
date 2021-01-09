import React, { useState, useEffect } from "react";
import cloneDeep from "lodash.clonedeep";

import "./Cart.scss";

import TopBar from "./../../components/layout/TopBar";

import Button from "./../../components/ui/Button";

import CartTextBlock from "./CartTextBlock";
import CartTable from "./CartTable";
import CartMessage from "./CartMessage";
import CartToast, { notify } from "./CartToast";

import CartReducer from "./state/CartReducer";
import CartContext from "./state/CartContext";

import { getSubtotal, getVat, getTotal } from "./utilities";

function Cart(props) {
  const [state, dispatch] = React.useReducer(CartReducer, {
    items: [],
    toRemove: [],
  });

  const [hasFetchedData, setIsHasFetchedData] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

  useEffect(() => {
    fetch(process.env.CART_ITEMS_ENDPOINT)
      .then((response) => response.json())
      .then(({ items }) => {
        setIsHasFetchedData(true);
        dispatch({ type: "SET_FETCHED_ITEMS", items: items });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  function canBeSubmitted() {
    console.log(state.items.length);
    let itemsToBuy = state.items.filter(
      (item) => item.quantity <= item.stockLevel
    ).length;
    console.log(itemsToBuy > 0);
    return itemsToBuy > 0 ? true : false;
  }

  function submit() {
    if (!state.items.length) {
      return;
    }
    setIsSubmitting(true);

    fetch(process.env.CART_SUBMIT_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(state.items),
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
    <CartContext.Provider value={{ state, dispatch }}>
      <div className="Cart">
        <TopBar />
        <div className="Cart__main">
          <CartTextBlock />

          {hasFetchedData ? (
            <div className={isSubmitting ? "is-submitting" : ""}>
              <CartTable hasBeenSubmitted={hasBeenSubmitted} />
              {!hasBeenSubmitted && (
                <div className="Cart__submit">
                  <Button
                    label="Buy now"
                    isDisabled={!canBeSubmitted()}
                    onClickHandler={submit}
                    hasSpinner={isSubmitting}
                  />
                </div>
              )}
              {!state.items.length && (
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
            <CartTable isLoading={true} />
          )}
        </div>

        <CartToast />
      </div>
    </CartContext.Provider>
  );
}

export default Cart;
