import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import type { Product } from "../types";
import styles from "./ProductGrid.module.css";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (productId: number, quantity: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  return (
    <div className={styles["product-grid"]}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
