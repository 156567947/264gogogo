import { useReducer } from "react";
import { createContext } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    console.log(action);
    const index = state.items.findIndex((item) => item.id === action.item.id);
    const updateItems = [...state.items];
    const existingItem = state.items[index];
    if (index >= 0) {
      const updateItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updateItems[index] = updateItem;
    } else {
      updateItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updateItems };
  }
  if (action.type === "REMOVE_ITEM") {
    const index = state.items.findIndex((item) => item.id === action.id);
    const existingItem = state.items[index];
    const updateItems = [...state.items];
    if (existingItem.quantity === 1) {
      updateItems.splice(index, 1);
    } else {
      const updateItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updateItems[index] = updateItem;
    }
    return { ...state, items: updateItems };
  }
  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }
  return state;
}
export function CardContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });
  const cartContext = {
    items: cart.items,
    addItem: addItem,
    removeItem: removeItem,
    clearCart: clearCart,
  };
  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  }
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  }
  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
export default CartContext;
