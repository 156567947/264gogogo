import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from './components/Cart.jsx'
import { CardContextProvider } from "./store/CartContext.jsx";
import {UserProgressProvider} from "./store/UserProgressContext.jsx";
import Checkout from "./components/Checkout.jsx";
function App() {
  return (
    <UserProgressProvider>
      <CardContextProvider>
        <Header />
        <Meals />
        <Cart></Cart>
        <Checkout />
      </CardContextProvider>
    </UserProgressProvider>
  );
}

export default App;
