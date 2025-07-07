import React from "react";
import List from "./List";
import Create from "./Create";

type Product = {
  id: number;
  title: string;
  slug: string;
  price: string;
  description: string;
  image?: string;
};

export default function Products() {
  const [reload, setReload] = React.useState(0);

  const handleOnProductCreated = (product: Product) => {
    console.log("Product created:", product);
    setReload((prev) => prev + 1);
  };

  return (
    <>
      <Create onProductCreated={handleOnProductCreated} />
      <List reload={reload} />
    </>
  );
}
