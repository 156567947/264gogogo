import React, { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import Input from "../UI/Input";
import { currentFormatten } from "../util/formatting";
import Button from "../UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
const reqConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData
  } = useHttp("http://localhost:3000/orders", reqConfig);
  const cartTotal = cartCtx.items.reduce((num, item) => {
    return num + item.quantity * item.price;
  }, 0);
  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    console.log(fd);
    const customData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customData,
        },
      })
    );
  }
  const handleFinish=()=>{
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData()
  }
  let actions = (
    <>
      <Button type="button" textOnly onClick={userProgressCtx.hideCheckout}>
        Close
      </Button>
      <Button>submit</Button>
    </>
  );
  if (isSending) {
    actions = <span>sending...</span>;
  }
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={userProgressCtx.hideCheckout}
      >
        <h2>success</h2>
        <p>your order was submitted successfully</p>
        <p>we will get back to you </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={userProgressCtx.hideCheckout}
    >
      <form action="" onSubmit={handleSubmit}>
        <h2>CheckOut</h2>
        <p>total amount:{currentFormatten.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="email adress" type="email" id="email" />
        <Input label="street" type="text" id="street" />
        <Input label="phone number" type="number" id="phone-number" />
        <div className="control-row">
          <Input label={"postal code"} type="text" id="postal-code"></Input>
          <Input label="city" type="text" id={"city"}></Input>
        </div>
        {error && <Error title="failed to send" message={error}></Error>}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
