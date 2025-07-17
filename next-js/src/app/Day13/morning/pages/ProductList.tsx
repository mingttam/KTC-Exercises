import React from "react";
import Image from "next/image";

import { IProductListProps } from "../types";

const ProductList = async ({}) => {
  const response = await fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=10", {
    next: { revalidate: 60 },
  });
  const data: IProductListProps[] = await response.json();

  return (
    <div>
      <Products products={data} />
    </div>
  );
};
export default ProductList;

const Products = ({ products }: { products: IProductListProps[] }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-600">Price: ${product.price}</p>
          <Image
            src={product.images[0]}
            alt={product.title}
            width={200}
            height={200}
            className="w-full h-auto mt-2"
          />
        </div>
      ))}
    </div>
  );
};
