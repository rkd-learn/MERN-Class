

import { useState } from "react"
import { API_URL } from "../config/config"

import Axios from "axios";

export const Product = ({ product }) => {

  const [qty, setQty] = useState(0)

  const cartID = localStorage.getItem("CART_ID")

  const handleAddToCart = async (id, name) => {
    // API HIT to add product on cart

    if (cartID) {
      await Axios.put(`${API_URL}/cart/${cartID}/existing`, {
        productID: id,
        Qty: parseInt(qty)
      })

      alert(`${name} is added on existing cart`)

      return
    }

    if (qty <= 0) {
      alert("Product qty 0 or negative")
      return
    }

      if (cartData.data._id) {
        localStorage.setItem("CART_ID", cartData.data._id)
        alert(`${name} is added on cart`)
      }

    }catch (e) {
      console.error(e)
    }

  }

  return (
    <div className="card">
      <img className="img-fluid img-rounded" src={`${API_URL}/${product.image}`} style={{ height: '200px' }} alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">Name: {product.name}</h5>
        <h6>Price: ${product.price}</h6>
        <h6>Size : {product.size}  </h6>
        <h6>Brand : {product.brand}</h6>
        <div className="form-group-inline">
          <input className="form-control" placeholder="Qty" value={qty} onChange={(e) => setQty(e.target.value)} type='number' id="qty" name="qty" />
        </div>
        <button className="btn btn-primary" onClick={() => handleAddToCart(product._id, product.name)}>Add to cart </button>
      </div>
    </div>
  )
}

