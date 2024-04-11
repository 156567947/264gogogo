import { useReducer } from "react";
import { createContext } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const index=state.items.findIndex(item=>item.id===action.id)
    const updateItems=[...state.items]
    const existingItem=state.items[index]
    if(index>=0){
      const updateItem={
        ...existingItem,
        quantity:sexistingItem.quantity+1
      }
      updateItems[index]=updateItem
    }else{
        updateItems.push({...action.item,quantity:1})
    }
  }
  if (action.type === "REMOVE_ITEM") {
  }
  return {...state,items:updateItems};
}
export function CardContextProvider({ children }) {
  useReducer(cartReducer, { items: [] });
  return <CardContextProvider>{children}</CardContextProvider>;
}
export default CartContext;
