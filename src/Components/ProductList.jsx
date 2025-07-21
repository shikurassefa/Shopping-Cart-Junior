import { productStore } from "../Stores/productStores";
import { useEffect } from "react";

import ProductItem from "./ProductItem";
const ProductList = () => {
  const products = productStore((state) => state.products);
  const fetchedProducts = productStore.getState().fetchedProducts;

  useEffect(() => {
    if (!products || products.length === 0) {
      fetchedProducts && fetchedProducts();
    }
  }, [products]);
  return (
    <div className="product-list-container">
      <h1>Desserts</h1>
      <section className="product-list">
        {products && products.length > 0 ? (
          products.map((product) => {
            return <ProductItem product={product} key={product.id}></ProductItem>;
          })
        ) : (
          <p>No products available.</p>
        )}
      </section>
    </div>
  );
};

export default ProductList;
