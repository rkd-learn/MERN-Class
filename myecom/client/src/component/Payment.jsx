import Axios from "axios"

import { API_URL } from "../config/config"

import { Link } from "react-router-dom"

export const Payment = () => {

  const orderID = localStorage.getItem("ORDER_ID")

  const handlePay = async () => {

    const cartData = {
      paymentStatus: 'paid'
    }

    try {

      const res = await Axios.put(`${API_URL}/order/${orderID}`,
        cartData
      )

      if (res.data) {
        alert("SuccessFully paid")
      }
    } catch (e) {
      console.log("E", e)
    }
  }

  return (
    <div>
      {
        orderID ? (
          <button className="btn btn-primary" onClick={handlePay} >Pay</button>
        ) : (
          <Link to={'/'}>There is no ordered Item to pay </Link>
        )
      }
    </div>
  )
}
