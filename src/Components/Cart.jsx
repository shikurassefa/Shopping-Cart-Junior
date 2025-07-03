import { cartStore } from "../Stores/cartStores"
import {useNavigate} from 'react-router-dom'
import Confirm from '../Components/Confirm'
import { useState } from "react";
const Cart = () => {
  const cart = cartStore((state) => state.cart);
  const getTotalQuantity = cartStore((state) => state.getTotalQuantity);
  const getTotalPrice = cartStore((state) => state.getTotalPrice);
  const handleRemoveFromCart = cartStore((state) => state.handleRemoveFromCart);


  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmClick = () => {
    setShowConfirm(true);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
  };

  return (
    <div className="cart">
      <h2>Your Cart ({getTotalQuantity()})</h2>

      {cart.length > 0 ? (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <div className="cart-item">
                <h4>{item.name}</h4>
                <div className="cart-items-info">
                  <div className="price-container">
                    <p>{item.quantity}x</p>
                    <p>@${item.price}</p>
                    <p>${item.quantity * item.price}</p>
                  </div>
                  <button className="remove-btn" onClick={() => handleRemoveFromCart(item.id)}>
                    <img src="./assets/images/icon-remove-item.svg" alt="icon-remove" className="remove-icon"/>
                  </button>
                </div>
              </div>
            </li>
          ))}
          <div className="order-total">
            <p>Order Total:</p>
            <p>${getTotalPrice()}</p>
          </div>
          <div className="carbon-neutral">
            <img src="./assets/images/icon-carbon-neutral.svg" alt="icon-carbon-neutrals" />
            <p>this is <span>carbon-neutral</span>delivery</p>
          </div>
          <button className="confirm-btn" onClick={handleConfirmClick}>confirm order</button>
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}

      {showConfirm && (
        <>
          <Confirm onClose={handleCloseConfirm} />
        </>
      )}
    </div>
  );
};
export default Cart;
