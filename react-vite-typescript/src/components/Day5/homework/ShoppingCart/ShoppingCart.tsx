import React, { useState, useCallback } from "react";
import ProductGrid from "./ProductGrid/ProductGrid";
import CartIcon from "./CartIcon/CartIcon";
import CartDropdown from "./CartDropdown/CartDropdown";
import type { Product, CartItem } from "./types";
import styles from "./ShoppingCart.module.css";

const products: Product[] = [
  { id: 1, name: "Knorr Demiglace Sauce Powder 1kg", price: 315000 },
  { id: 2, name: "Kikkoman Soy Sauce 1L", price: 180000 },
  { id: 3, name: "Do Luong Rice Paper (5 pcs)", price: 25000 },
  { id: 4, name: "Lea & Perrins Worcestershire Sauce 290ml", price: 150000 },
];

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const addToCart = useCallback((productId: number, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const product = products.find((p) => p.id === productId);
        if (product) {
          return [...prevItems, { ...product, quantity }];
        }
        return prevItems;
      }
    });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeItem = useCallback((productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={styles["shopping-cart"]}>
      <header className={styles.header}>
        <h1>Shopping Cart</h1>
        <div className={styles["cart-container"]}>
          <CartIcon itemCount={totalItems} onToggleDropdown={toggleDropdown} />
          <CartDropdown
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            isOpen={isDropdownOpen}
          />
        </div>
      </header>

      <main className={styles["main-content"]}>
        <ProductGrid products={products} onAddToCart={addToCart} />
      </main>
    </div>
  );
};

export default ShoppingCart;
