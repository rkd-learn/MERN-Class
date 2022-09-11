import { useState } from "react";
import { API_URL } from "../config/config";
import { Link } from "react-router-dom";

import Axios from "axios";

export const Product = ({ product ,handleDelete}) => {
  const [qty, setQty] = useState(0);

  const cartID = localStorage.getItem("CART_ID");


  return (
    <div className="card">
      <img
        className="img-fluid img-rounded"
        src={`${API_URL}/${product.image}`}
        style={{ height: "200px" }}
        alt={product.name}
      />
      <div className="card-body">
        <h5 className="card-title">Name: {product.name}</h5>
        <h6>Price: ${product.price}</h6>
        <h6>Size : {product.size} </h6>
        <h6>Brand : {product.brand}</h6>
        <Link to={`/product/${product._id}`}>
          <a className="btn btn-primary">Update</a>
        </Link>
        <button className="btn btn-primary" onClick={()=>handleDelete(product._id,product.name)}>Delete</button>
      </div>
    </div>
  );
};
