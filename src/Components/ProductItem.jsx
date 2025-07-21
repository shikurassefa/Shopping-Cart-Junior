import { useCallback } from "react";
import { cartStore } from "../Stores/cartStores";

import iconIncrement from "../assets/images/icon-increment-quantity.svg";
import iconDecrement from "../assets/images/icon-decrement-quantity.svg";
import addToCartIcon from "../assets/images/icon-add-to-cart.svg";

const ProductItem = ({ product }) => {
  const { id, name, price, category, image } = product;
  const quantity = cartStore(
    (state) => state.cart.find((item) => item.id === product.id)?.quantity || 0
  );
  const addToCart = cartStore((state) => state.addToCart);
  const handleDecrement = cartStore((state) => state.handleDecrement);

  const isInCart = quantity > 0;
  const handleAddToCart = useCallback(() => {
    addToCart(id, name, price, category, image);
  }, [addToCart]);

  const handleOnKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        addToCart(id, name, price, category, image);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleDecrement(id);
      } else if (e.key === "Enter") {
        return;
      }
    },
    [addToCart, handleDecrement]
  );

  return (
    <article className="product">
      <div className="image-wrapper">
        <img
          src={image?.desktop ?? "../assets/images/default-fallback-image.png"}
          alt={name}
          className={`product-image ${isInCart ? "outline" : ""}`}
        />
        {/* quantity-container */}
        {isInCart ? (
          <div
            className="quantity-container"
            onKeyDown={(e) => handleOnKeyDown(e)}
            tabIndex={0}
            role="group"
          >
            <button
              onClick={() => handleDecrement(id)}
              aria-label="Decrement quantity"
              role="button"
            >
              <img
                src={iconDecrement}
                alt="icon-decrement-quantity"
                className="cart-icon-decrement"
              />
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => handleAddToCart()}
              aria-label="Increment quantity"
              role="button"
            >
              <img
                src={iconIncrement}
                alt="icon-increment-quantity"
                className="cart-icon-increment"
              />
            </button>
          </div>
        ) : (
          <button className="add-to-cart-btn" onClick={() => handleAddToCart()}>
            <img
              src={addToCartIcon}
              alt="icon-add-to-cart"
              className="cart-icon"
            />{" "}
            <span>Add to Cart</span>
          </button>
        )}
      </div>
      <div className="product-info">
        <p className="category">{category}</p>
        <h4>{name}</h4>
        <p className="price">
          {" "}
          {price != null ? `$${price}` : "Price unavailable"}
        </p>
      </div>
    </article>
  );
};
export default ProductItem;
