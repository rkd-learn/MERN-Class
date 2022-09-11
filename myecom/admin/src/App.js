import { Route, Routes } from "react-router-dom";

import { Home } from "./component/Home";

import { Nav } from "./common/nav";
import { ProductForm } from "./component/ProductForm";

function App() {
  return (
    <div className="container">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductForm />} />
        <Route path="/product/:id" element={<ProductForm />} />
      </Routes>
    </div>
  );
}

export default App;
