

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
    try {
      const cartData = await Axios.post(`${API_URL}/cart`, {
        Qty: qty,
        productID: id
      })

      if (cartData.data._id) {
        localStorage.setItem("CART_ID", cartData.data._id)
        alert(`${name} is added on cart`)
      }

    } catch (e) {
      console.error(e)
    }

  }

  return (
    <div>
      <img src={`${API_URL}/${product.image}`} alt={product.name} width={200} height={200} />
      <h1>Name: {product.name}</h1>
      <h2>Price: ${product.price}</h2>
      <h2>Size : {product.size}</h2>
      <h2>Brand : {product.brand}</h2>
      <label htmlFor="qty">Qty      </label>
      <input value={qty} onChange={(e) => setQty(e.target.value)} type='number' id="qty" name="qty" />
      <button onClick={() => handleAddToCart(product._id, product.name)}>Add to cart </button>
      <hr />
    </div>
  )
}

