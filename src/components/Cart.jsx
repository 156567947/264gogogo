import React, { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import { currentFormatten } from "../util/formatting";
import Button from "../UI/Button";
import CardItem from "./CardItem";
import UserProgressContext from "../store/UserProgressContext";
export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProcessCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce((num, item) => {
    return num + item.quantity * item.price;
  }, 0);
  const handleGoToCheckout = () => {
    userProcessCtx.showCheckout();
  };
  const handleClose = () => {
    userProcessCtx.hideCart();
  };
  

  return (
    <Modal open={userProcessCtx.progress === "cart"} className="cart" onClose={userProcessCtx.progress === "cart" ? handleClose : null}>
      <h2>your cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CardItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          ></CardItem>
        ))}
      </ul>
      <p className="cart-total">{currentFormatten.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly={true} onClick={handleClose}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>GO TO CHECKOUT</Button>
        )}
      </p>
    </Modal>
  );
}
