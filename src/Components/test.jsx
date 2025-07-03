import { productStore } from "../Stores/productStores";

const {products,fetchedProducts}=productStore((state)=> (
    {
        products:state.products,
        fetchedProducts:state.fetchedProducts
    }
));
const {cart,addToCart,handleDecrement}=cartStore((state)=>(
    {
        cart:state.cart,
        addToCart:state.addToCart,
        handleDecrement:state.handleDecrement
    }
)
)
