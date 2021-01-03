import React, { Fragment } from "react";

import { round } from "./utilities";

import "./CartTable.scss";

function CartTable(props) {
  return (
    <div className="CartTable">
      <table className="CartTable__table">
        <thead className="CartTable__head">
          <tr>
            <th className="CartTable__cell is-heading is-product" id="product">
              Product
            </th>
            <th className="CartTable__cell is-heading is-price" id="price">
              Price
            </th>
            <th
              className="CartTable__cell is-heading is-quantity"
              id="quantity"
            >
              Quantity
            </th>
            <th className="CartTable__cell is-heading is-cost" id="cost">
              Cost
            </th>
            <th className="CartTable__cell is-heading is-delete" id="delete">
              Delete
            </th>
          </tr>
        </thead>
        {props.isLoading ? (
          <tbody className="CartTable__body" aria-hidden="true">
            {[...Array(3)].map((item, index) => (
              <tr className="CartTable__row" key={index}>
                <td className="CartTable__cell is-loading" colSpan="5">
                  &nbsp;
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <Fragment>
            <tbody className="CartTable__body">
              {props.cartData.items.map((item) => (
                <tr
                  className={`CartTable__row ${
                    item.quantity > item.stockLevel ? "is-out-of-stock" : ""
                  }`}
                  key={item.sku}
                >
                  <td
                    className="CartTable__cell is-product has-no-h-padding"
                    data-title="Product"
                  >
                    {item.name}
                  </td>
                  <td className="CartTable__cell is-price" data-title="Price">
                    £{item.price}
                  </td>
                  <td
                    className="CartTable__cell is-quantity"
                    data-title="Quantity"
                  >
                    <div className="CartTable__quantity-input-wr">
                      <button
                        className="CartTable__quantity-input-btn is-minus"
                        aria-label="Increase quantity"
                        onClick={(e) =>
                          props.updateCartData(
                            "DECREASE",
                            item.sku,
                            item.quantity - 1
                          )
                        }
                      ></button>
                      <input
                        className="CartTable__quantity-input-el"
                        type="text"
                        value={item.quantity}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onChange={(e) =>
                          props.updateCartData(
                            "ADJUST",
                            item.sku,
                            e.target.value
                          )
                        }
                      />
                      <button
                        className="CartTable__quantity-input-btn is-plus"
                        aria-label="Decrease quantity"
                        onClick={(e) =>
                          props.updateCartData(
                            "INCREASE",
                            item.sku,
                            item.quantity + 1
                          )
                        }
                      ></button>
                    </div>
                  </td>
                  <td className="CartTable__cell is-cost" data-title="Cost">
                    £{round(item.price * item.quantity)}
                  </td>
                  <td
                    className="CartTable__cell is-delete has-no-h-padding"
                    data-title="Delete"
                  >
                    <button
                      className="CartTable__btn is-delete"
                      aria-label="Delete"
                      onClick={(e) => props.updateCartData("DELETE", item.sku)}
                    ></button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="CartTable__recap">
              <tr className="CartTable__row">
                <td className="CartTable__cell is-subheading" colSpan="3">
                  Subtotal
                </td>
                <td className="CartTable__cell is-subtotal">
                  £{props.cartData.subtotal}
                </td>
              </tr>
              <tr className="CartTable__row">
                <td className="CartTable__cell is-subheading" colSpan="3">
                  VAT at 20%
                </td>
                <td className="CartTable__cell is-vat">
                  £{props.cartData.vat}
                </td>
              </tr>
              <tr className="CartTable__row">
                <td
                  className="CartTable__cell is-subheading is-highlighted"
                  colSpan="3"
                >
                  Total cost
                </td>
                <td className="CartTable__cell is-total is-highlighted">
                  £{props.cartData.total}
                </td>
              </tr>
            </tfoot>
          </Fragment>
        )}
      </table>
    </div>
  );
}

export default CartTable;
