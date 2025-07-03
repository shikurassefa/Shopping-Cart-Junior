import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";
import Confirm from "./Components/Confirm";
import { cartStore } from "./Stores/cartStores";
const App = () => {
  
  return (
   
    <main>
      <ProductList></ProductList>
      <Cart></Cart>
    </main>
  );
};
export default App;