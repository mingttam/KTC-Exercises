import { ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-orange-500 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold hover:text-orange-200 transition-colors">
              Magazines
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-orange-200 transition-colors">
              Home
            </Link>
            <Link to="/blog" className="hover:text-orange-200 transition-colors">
              Blog
            </Link>
            <Link to="/category" className="hover:text-orange-200 transition-colors">
              Category
            </Link>
            <Link to="/" className="hover:text-orange-200 transition-colors">
              Product
            </Link>
            <Link to="/login" className="hover:text-orange-200 transition-colors">
              Login
            </Link>
            <Link to="/customer" className="hover:text-orange-200 transition-colors">
              Customer
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <ShoppingCart className="h-6 w-6 cursor-pointer hover:text-orange-200 transition-colors" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden hover:text-orange-200 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-orange-400">
            <div className="flex flex-col space-y-2 pt-4">
              <Link
                to="/"
                className="hover:text-orange-200 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/blog"
                className="hover:text-orange-200 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/category"
                className="hover:text-orange-200 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Category
              </Link>
              <Link
                to="/"
                className="hover:text-orange-200 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Product
              </Link>
              <Link
                to="/login"
                className="hover:text-orange-200 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/customer"
                className="hover:text-orange-200 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Customer
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
