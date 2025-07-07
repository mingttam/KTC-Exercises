import React, { useEffect } from "react";

const url = "https://api.escuelajs.co/api/v1/products";

type Product = {
  id: number;
  title: string;
  slug: string;
  price: string;
  description: string;
  image: string;
};

type Props = {
  productId: number;
  onProductUpdated?: (product: Product) => void;
  onClose?: () => void;
};

const Update = ({ productId, onProductUpdated, onClose }: Props) => {
  const [formData, setFormData] = React.useState({
    title: "",
    slug: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`${url}/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await response.json();
        setFormData({
          title: data.title || "",
          slug: data.slug || "",
          price: data.price || "",
          description: data.description || "",
          image: data.images?.[0] || "",
        });
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProductData();
  }, [productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${url}/${productId}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          categoryId: 16,
          images: [formData.image],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network not ok, try again later!");
      }
      const data: Product = await response.json();
      setFormData({
        title: "",
        slug: "",
        price: "",
        description: "",
        image: "",
      });
      if (onProductUpdated) {
        onProductUpdated(data);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <form
        className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
          <div className="mb-4">
            <div>
              <div className="w-full p-4 bg-white rounded shadow">
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
                    type="number"
                    id="price"
                    value={formData.price}
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="description"
                  >
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
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="image">
                    Image
                  </label>
                  <input
                    type="text"
                    id="image"
                    value={formData.image}
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors"
              type="button"
            >
              Close
            </button>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Update Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Update;
