import React from "react";

type Product = {
  id: number;
  title: string;
  slug: string;
  price: string;
  description: string;
  image?: string;
};

type Props = {
  onProductCreated?: (data: Product) => void;
};

const url = "https://api.escuelajs.co/api/v1/products";

const Create = ({ onProductCreated }: Props) => {
  const [formData, setFormData] = React.useState({
    title: "",
    slug: "",
    price: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          categoryId: 15,
          images: ["https://placehold.co/600x400"],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to create item");
      }
      const data: Product = await response.json();
      setFormData({
        title: "",
        slug: "",
        price: "",
        description: "",
      });
      alert("Create successful!");
      if (onProductCreated) {
        onProductCreated(data);
      }
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };
  return (
    <div className="flex justify-center items-center py-9 bg-gray-100">
      <form className="w-xl p-4 bg-white rounded shadow mb-4" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Create Product</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="slug">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            value={formData.slug}
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="price">
            Price
          </label>
          <input
            type="text"
            id="price"
            value={formData.price}
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={formData.description}
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default Create;
