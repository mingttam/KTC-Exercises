import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/pages/Home";
import Blog from "./components/pages/Blog";
import Category from "./components/pages/Category";
import Product from "./components/pages/Product";
import Login from "./components/pages/Login";
import Customer from "./components/pages/Customer";

export default function Day77() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/category" element={<Category />} />
          <Route path="/" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customer" element={<Customer />} />
        </Routes>
      </Router>
    </>
  );
}
