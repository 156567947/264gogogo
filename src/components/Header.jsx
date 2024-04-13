import React, { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "../UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Cart from "./Cart";
export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProcessCtx = useContext(UserProgressContext);
  const totalCartItems = cartCtx.items.reduce((total, current) => {
    return total + current.quantity;
  }, 0);

  const handleShowCart = () => {
    console.log(userProcessCtx)
    userProcessCtx.showCart();
  };
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="good" />
        <h1>react good</h1>
      </div>
      <nav>
        <Cart></Cart>
        <Button onClick={handleShowCart} textOnly>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
