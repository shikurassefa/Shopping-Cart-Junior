import { cartStore } from "../Stores/cartStores";
import { productStore } from "../Stores/productStores";
import { useEffect } from "react";

import iconIncrement from "../assets/images/icon-increment-quantity.svg";
import iconDecrement from "../assets/images/icon-increment-quantity.svg";
import addToCartIcon from "../assets/images/icon-add-to-cart.svg";
const ProductList = () => {
  // Fetch products from the product store
  // const { products, fetchedProducts } = productStore((state) => ({
  //   products: state.products,
  //   fetchedProducts: state.fetchedProducts,
  // }));

const products= productStore((state)=>state.products);
    const fetchedProducts = productStore((state) => state.fetchedProducts);
  const cart = cartStore((state) => state.cart);
  const addToCart = cartStore((state) => state.addToCart);
  const handleDecrement = cartStore((state) => state.handleDecrement);

const handleAddToCart=(product)=>
{
  addToCart(product.name, product.id, product.price, product.category, product.image);
}
  useEffect(() => {
    if (!products || products.length === 0) {
      fetchedProducts && fetchedProducts();
    }
  }, [products, fetchedProducts]);
  const handleOnKeyDown = (e, product) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      addToCart(product.name, product.id, product.price, product.category, product.image);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handleDecrement(product.id);
    }
  };
  return (
    <div className="product-list-container">
      <h1>Desserts</h1>
      <section className="product-list">
        {products && products.length > 0 ? (
          products.map((product) => {
            const cartItem = cart.find((item) => item.id === product.id);
            return (
              
              <article key={product.id} className="product">
                
                <div className="image-wrapper">
                  <img
                    src={product.image.desktop}
                    alt={product.name}
                    className={`product-image ${
                      cartItem ? "outline"
                        : ""
                    }`}
                  />
                  {/* quantity-container */}
                  {cartItem ? (
                    <div className="quantity-container">
                      <button
                        onClick={() => handleDecrement(product.id)}
                        onKeyDown={(e)=>handleOnKeyDown(e,product)}
                      aria-label="Decrement quantity" role="button">
                        <img
                          src={iconDecrement}
                          alt="icon-decrement-quantity"
                          className="cart-icon-decrement"
                        />
                      </button>
                      <span>
                        {cartItem?.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleAddToCart(
                           product
                          )
                        }
                        onKeyDown={(e) =>
                          handleOnKeyDown(
                            e,
                            product
                          )
                        }
                      aria-label="Increment quantity" role="button">
                        <img
                          src={iconIncrement}
                          alt="icon-increment-quantity"
                          className="cart-icon-increment"
                        />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="add-to-cart-btn"
                      onClick={() =>
                        handleAddToCart(
                          product.name,
                          product.id,
                          product.price,
                          product.category,
                          product.image
                        )
                      }
                    >
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
                  <p className="category">{product.category}</p>
                  <h4>{product.name}</h4>
                  <p className="price">${product.price}</p>
                </div>
              </article>
            );
          })
        ) : (
          <p>No products available.</p>
        )}
      </section>
    </div>
  );
};

export default ProductList;
