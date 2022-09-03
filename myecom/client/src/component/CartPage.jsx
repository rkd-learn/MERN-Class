import { useState } from "react";
import { useEffect } from "react"

import Axios from "axios";

import { API_URL } from "../config/config"

export const CartPage = () => {

  const cartID = localStorage.getItem("CART_ID");

  const [cart, setCart] = useState({});

  const [err, setErr] = useState(null)

  const [isLoading, setIsLoading] = useState(true);

  const removeCart = async () => {

    try {
      await Axios.delete(`${API_URL}/cart/${cartID}`)

      localStorage.removeItem("CART_ID")

      setCart({})
    } catch (eer) {
      console.error(eer)
    }

  }

  const placeOrder = async () => {
    // TODO: place order logic
  }

  useEffect(() => {

    const fetchData = async () => {
      try {
        const result = await Axios(
          `${API_URL}/cart/${cartID}`,
        );
        setIsLoading(false);
        setCart(result.data);
      }
      catch (e) {
        setErr(e?.response?.data?.error ?? e.messsage)
      }
    }
    if (cartID) {
      fetchData();
    }
  }, [cartID])


  if (!cartID) {
    return <h1>No Product Add</h1>
  }

  if (err) {
    return <h1>{err}</h1>
  }


  if (isLoading) {
    return <h1>Loading...</h1>
  }




  return (
    <div>
      {
        cart.items?.map(item => (
          <div key={item._id}>
            <img src={`${API_URL}/${item.product.image}`} alt={item.product.name} width={200} height={200} />
            <h1>Name: {item.product.name}</h1>
            <h1>Qty: {item.Qty}</h1>
            <h1>Total Price: {item.Qty * item.product.price}</h1>

          </div>
        ))
      }
      <button onClick={removeCart}>Remove Cart</button>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  )
}

