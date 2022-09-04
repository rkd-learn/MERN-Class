import Axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { API_URL } from "../config/config"
import { CartComponent } from "./CartPage"

export const OrderPage = () => {

  const navitation = useNavigate();

  const [user, setUser] = useState()

  const [userData, setUserData] = useState({
    email: "",
    name: "",
    address: "",
    shippingAddress: ""
  })

  const [err, setErr] = useState(null)

  useEffect(() => {

    const userID = localStorage.getItem("USER_ID")

    async function getUserInfo(userID) {
      try {
        const res = await Axios.get(`${API_URL}/user/${userID}`)

        if (res.data) {
          setUser(res.data)
        }

      } catch (e) {
        console.log("EE", e)
      }
    }

    if (userID) {
      getUserInfo(userID)
    }


  }, [])


  const setData = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const addUserInfo = async (e) => {

    e.preventDefault()

    try {

      const res = await Axios.post(`${API_URL}/user/guest`,
        userData
      )

      if (res.data) {
        setUser(res.data)
        console.log("data", res.data)
        localStorage.setItem("USER_ID", res.data._id)
        navigator("/pay")
      }
    } catch (e) {

      setErr(e.response.data.error || e.message)
    }

  }


  const isUserInfoAvailable = user?._id ? true : false

  const placeOrder = async () => {

    const cartID = localStorage.getItem("CART_ID");

    const cartData = {
      cartID,
      userID: user?._id
    }

    try {

      const res = await Axios.post(`${API_URL}/order`,
        cartData
      )

      if (res.data) {
        alert("SuccessFully orderd")
        localStorage.setItem("ORDER_ID", res.data._id)
      }
    } catch (e) {
      setErr(e.response.data.error || e.message)
    }

  }

  return (
    <div id="billing" className="row">
      {err && <h2 style={{
        color: 'red',
        margin: 'auto'
      }}>{err}</h2>}

      <div className="col-6">

        {
          user ? (
            <>
              <h2> {user.name}</h2>
            </>
          ) : (

            <div id="login-row" className="row justify-content-center align-items-center">
              <div id="login-column" className="col-md-6">
                <div id="login-box" className="col-md-12">
                  <form id="login-form" className="form" onSubmit={addUserInfo} >
                    <h3 className="text-center text-info">Add info</h3>
                    <div className="form-group">
                      <label htmlFor="email" className="text-info">email:</label><br />
                      <input type="text" name="email" id="email" className="form-control"
                        onChange={setData}
                        required={true}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name" className="text-info">name:</label><br />
                      <input type="text" name="name" id="name" className="form-control"
                        onChange={setData}
                        required={true}

                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="address" className="text-info">address:</label><br />
                      <input type="text" name="address" id="address" className="form-control"
                        onChange={setData}
                        required={true}

                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="shippingAddress" className="text-info">shippingAddress:</label><br />
                      <input type="shippingAddress" name="shippingAddress" id="shippingAddress" className="form-control"
                        onChange={setData}
                        required={true}
                      />
                    </div>

                    <div className="form-group">
                      <input type="submit" name="submit" className="btn btn-info btn-md" value="submit" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )
        }
      </div>

      <div className="col-6">
        <h4>Prodduct info</h4>
        <CartComponent isOrderPage={true} isUserInfoAvailable={isUserInfoAvailable} placeOrder={placeOrder} />
      </div>
    </div>
  )
}

