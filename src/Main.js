import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Chat from "./pages/Chat";
import Flag from "./pages/Flag";
import Shirt from "./pages/Shirt";
import Product from "./pages/Products";

function Main() {
  return (
    <>
      <h1>Main Page</h1>
      <Link to="/">Home</Link> - <Link to="/about">About</Link> -
      <Link to="/contact">Contact</Link> - <Link to="/chat">Chat</Link> - &nbsp;
      <Link to="/flag">Flag</Link> - &nbsp;
      <Link to="/shirt">Shirt</Link> - &nbsp;
      <Link to="/addproduct">Add product</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/flag" element={<Flag />} />
        <Route path="/shirt" element={<Shirt />} />
        <Route path="/addproduct" element={<Product />} />
      </Routes>
    </>
  );
}

export default Main;
