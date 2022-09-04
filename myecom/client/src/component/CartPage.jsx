import { useState } from "react";
import { useEffect } from "react"

import Axios from "axios";

import { API_URL } from "../config/config"
import { Link } from "react-router-dom";

export const CartComponent = ({ isOrderPage = false, isUserInfoAvailable = false, placeOrder }) => {

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
      <div className="row">
        {
          cart.items?.map(item => (
            <div className="col-4 p-2 p-2" key={item._id}>
              <img src={`${API_URL}/${item.product.image}`} alt={item.product.name} width={200} height={200} />
              <h6>Name: {item.product.name}</h6>
              <h6>Qty: {item.Qty}</h6>
              <h6>Total Price: {item.Qty * item.product.price}</h6>

            </div>

          ))
        }
      </div>
      {
        !isOrderPage && (
          <>
            <button className="btn btn-primary mr-4" onClick={removeCart}>Remove Cart</button>
            <Link to="/order" >
              <a className="btn btn-primary mr-4">
                Go to Order Page
              </a>
            </Link>
          </>
        )}

      {
        isOrderPage && isUserInfoAvailable && (
          <button className="btn btn-primary" onClick={placeOrder}>Place Order</button>
        )
      }
    </div>
  )
}

