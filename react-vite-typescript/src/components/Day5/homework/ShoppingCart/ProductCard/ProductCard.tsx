import React, { useState } from "react";
import type { Product } from "../types";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price: number): string => {
    return price.toLocaleString("vi-VN") + " ₫";
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
    setQuantity(1); // Reset quantity after adding to cart
  };

  return (
    <div className={styles["product-card"]}>
      <div className={styles["product-info"]}>
        <h4 className={styles["product-name"]}>{product.name}</h4>
        <p className={styles.price}>{formatPrice(product.price)}</p>

        <div className={styles["quantity-selector"]}>
          <button
            className={styles["quantity-btn"]}
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className={styles["quantity-display"]}>{quantity}</span>
          <button
            className={styles["quantity-btn"]}
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            +
          </button>
        </div>

        <button className={styles["add-to-cart"]} onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
