import React from "react";

const url = "https://api.escuelajs.co/api/v1/products";

type Props = {
  productId: number;
  onProductDeleted?: (id: number) => void;
};

const Delete = ({ productId, onProductDeleted }: Props) => {
  const handleOnDelete = async (id: number) => {
    try {
      if (!confirm("Are you sure you want to delete this row?")) {
        return;
      }
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      await response.json();
      if (onProductDeleted) {
        onProductDeleted(id as number);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return (
    <div>
      <button
        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition-colors"
        onClick={() => handleOnDelete(productId)}
      >
        Delete
      </button>
    </div>
  );
};

export default Delete;
