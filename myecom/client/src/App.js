import { Route, Routes } from "react-router-dom";

import { Home } from "./component/Home";
import { Product } from "./component/ProductPage";

import { Nav } from "./common/nav";

function App() {
  return (
    <div className="container">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
