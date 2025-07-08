interface Category {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

interface FilterSidebarProps {
  categories: Category[];
  selectedCategories: number[];
  onCategoryChange: (categoryId: number) => void;
}

const Sidebar = ({ categories, selectedCategories, onCategoryChange }: FilterSidebarProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Bộ lọc</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-3 text-gray-700">Danh mục sản phẩm</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => onCategoryChange(category.id)}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
