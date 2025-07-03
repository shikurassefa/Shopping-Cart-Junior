import  './order.css'
import { cartStore } from '../Stores/cartStores'
const Confirm =({onClose})=>
{
   const cart = cartStore((state) => state.cart);
   const handleNewOrder=cartStore((state)=>state.handleNewOrder)
    const getTotalPrice = cartStore((state) => state.getTotalPrice);
return(
 
        <div class="order-confirmation-overlay" onClick={onClose}>
  <div class="order-confirmation">
    {/* success-icon */}
    <div class="success-icon">
      <img src="./assets/images/icon-order-confirmed.svg" alt="icon-order" />
    </div>

    <h2>Order Confirmed</h2>
    <p>We hope you enjoy your food!</p>
   <div className="order-items">
   {cart.map((item)=>
  {
    return(
      <div className="order-item" key={item.id}>
        <div className='item-info'>
           <img src={item.image.desktop} alt={item.name} className="order-item-image" />
           
       <div className="cart-items-info-wrapper">
        <h4>{item.name}</h4>
           <p>
             <span className="item-qty">{item.quantity}x</span>
            <span className="item-qty-price">@${item.price}</span>
           </p>
           
          </div>
        </div>
      
      <p>${item.price}</p>
         
        </div>  
      
    )
  })}
  <div className="order-total-wrapper">

            <p>Order Total</p>
            <p >${getTotalPrice()}</p>
         
    </div>
   </div>
  
    <button class="confirm-btn" onClick={()=>handleNewOrder()}>Start New Order</button>
  </div>
</div>

)
}
export default Confirm