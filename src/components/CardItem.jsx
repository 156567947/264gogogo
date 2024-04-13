import React from "react";
import { currentFormatten } from "../util/formatting";
export default function CardItem({ name, quantity, price,onDecrease,onIncrease }) {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {currentFormatten.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
