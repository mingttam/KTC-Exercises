import React from "react";
import type { CartItem } from "../types";
import styles from "./CartDropdown.module.css";

interface CartDropdownProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  isOpen: boolean;
}

const CartDropdown: React.FC<CartDropdownProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  isOpen,
}) => {
  const formatPrice = (price: number): string => {
    return price.toLocaleString("vi-VN") + " ₫";
  };

  const calculateTotal = (): number => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemoveItem(productId);
    } else {
      onUpdateQuantity(productId, newQuantity);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles["cart-dropdown"]}>
      <div className={styles["cart-header"]}>
        <h3>Cart Items</h3>
        <span className={styles["item-count"]}>{cartItems.length} items</span>
      </div>

      {cartItems.length === 0 ? (
        <div className={styles["empty-cart"]}>
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className={styles["cart-items"]}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles["cart-item"]}>
                <div className={styles["item-info"]}>
                  <h4 className={styles["item-name"]}>{item.name}</h4>
                  <p className={styles["item-price"]}>
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className={styles["item-controls"]}>
                  <div className={styles["quantity-controls"]}>
                    <button
                      className={styles["quantity-btn"]}
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className={styles["quantity-display"]}>
                      {item.quantity}
                    </span>
                    <button
                      className={styles["quantity-btn"]}
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <div className={styles["item-total"]}>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                    <button
                      className={styles["remove-btn"]}
                      onClick={() => onRemoveItem(item.id)}
                      title="Remove item"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles["cart-footer"]}>
            <div className={styles["total-section"]}>
              <span className={styles["total-label"]}>Total:</span>
              <span className={styles["total-price"]}>
                {formatPrice(calculateTotal())}
              </span>
            </div>
            <button className={styles["view-cart-btn"]}>View Cart</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
