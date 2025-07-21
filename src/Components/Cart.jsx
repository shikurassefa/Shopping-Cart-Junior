import { cartStore } from "../Stores/cartStores"
import {useNavigate} from 'react-router-dom'
import Confirm from '../Components/Confirm'
import { useState } from "react";

import CartItem from "./CartItem";
const Cart = () => {
  const cart = cartStore((state) => state.cart);
  const getTotalQuantity = cartStore((state) => state.getTotalQuantity);
  const getTotalPrice = cartStore((state) => state.getTotalPrice);
  const handleRemoveFromCart = cartStore((state) => state.handleRemoveFromCart);
const totalQuantity = getTotalQuantity();
const totalPrice = getTotalPrice();

  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmClick = () => {
    setShowConfirm(true);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
  };

  return (
    <div className="cart">
      <h2>Your Cart ({totalQuantity})</h2>

      {cart.length > 0 ? (
        <ul>
          {cart.map((item) => (
            
            <li key={item.id}>
              <CartItem item={item} handleRemoveFromCart={handleRemoveFromCart} />
            </li>
          ))}
          <div className="order-total">
            <p>Order Total:</p>
            <p>${totalPrice}</p>
          </div>
          <div className="carbon-neutral">
            <img src="./assets/images/icon-carbon-neutral.svg" alt="icon-carbon-neutrals" />
            <p>This is <span>carbon-neutral</span> delivery.</p>
          </div>
          <button className="confirm-btn" onClick={handleConfirmClick} type="button">confirm order</button>
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
