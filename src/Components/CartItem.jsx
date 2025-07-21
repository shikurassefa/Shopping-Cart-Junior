import removeIcon from "../assets/images/icon-remove-item.svg";
const CartItem = ({ item, handleRemoveFromCart }) => {
  const { name, quantity, price } = item;
  const totalPrice = (quantity * price).toFixed(2);

  return (
    <div className="cart-item">
      <h4>{name}</h4>
      <div className="cart-items-info">
        <div className="price-container">
          <p>{quantity}x</p>
          <p>@${price}</p>
          <p>${totalPrice}</p>
        </div>
        <button
          className="remove-btn"
          onClick={() => handleRemoveFromCart(id)}
          type="button"
          aria-label={`Remove ${name}`}
        >
          <img src={removeIcon} alt="remove-icon" className="remove-icon" />
        </button>
      </div>
    </div>
  );
};
export default CartItem;
