import { useState } from "react"

import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const LoginPage = () => {

  const navitation = useNavigate()

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const [err, setErr] = useState(null)

  const setData = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const login = async (e) => {

    e.preventDefault()

    try {

      if (!loginData.email || !loginData.password) {
        alert("email and password are required filed")
      }

      const res = await Axios.post("http://localhost:9000/user/login",
        loginData
      )

      if (res.data?.accessToken) {
        localStorage.setItem("ACCESS_TOKEN", res.data.accessToken)
        navitation("/product")
      }
    } catch (e) {

      setErr(e.response.data.error || e.message)

    }

  }


  return (
    <div id="login">

      {err && <h2 style={{
        color: 'red',
        margin: 'auto'
      }}>{err}</h2>}
      <h3 className="text-center text-red pt-5">Login form</h3>
      <div className="container">
        <div id="login-row" className="row justify-content-center align-items-center">
          <div id="login-column" className="col-md-6">
            <div id="login-box" className="col-md-12">
              <form id="login-form" className="form" onSubmit={login}>
                <h3 className="text-center text-info">Login</h3>
                <div className="form-group">
                  <label for="email" className="text-info">Email:</label><br />
                  <input type="text" name="email" id="email" className="form-control"
                    onChange={setData}

                    required={true}
                  />
                </div>
                <div className="form-group">
                  <label for="password" className="text-info">Password:</label><br />
                  <input type="password" name="password" id="password" className="form-control"
                    onChange={setData}
                    required={true}
                  />
                </div>
                <div className="form-group">
                  <label for="remember-me" className="text-info"><span>Remember me</span> <span><input id="remember-me" name="remember-me" type="checkbox" /></span></label><br />
                  <input type="submit" name="submit" className="btn btn-info btn-md" value="submit" />
                </div>
                <div id="register-link" className="text-right">
                  <Link to="/register">
                    <a className="text-info">Register here</a>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

