import Axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const SignUpPage = () => {

  const navitation = useNavigate()

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    name: "",
    address: ""
  })

  const [err, setErr] = useState(null)

  const setData = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const signup = async (e) => {

    e.preventDefault()

    try {
      const res = await Axios.post("http://localhost:9000/user/signup",
        loginData
      )

      if (res.data) {
        navitation("/login")
      }
    } catch (e) {

      setErr(e.response.data.error || e.message)
    }

  }

  return (
    <div id="singup">
      {err && <h2 style={{
        color: 'red',
        margin: 'auto'
      }}>{err}</h2>}

      <h3 className="text-center text-white pt-5">Registration form</h3>
      <div className="container">
        <div id="login-row" className="row justify-content-center align-items-center">
          <div id="login-column" className="col-md-6">
            <div id="login-box" className="col-md-12">
              <form id="login-form" className="form" onSubmit={signup} >
                <h3 className="text-center text-info">Register</h3>
                <div className="form-group">
                  <label for="email" className="text-info">email:</label><br />
                  <input type="text" name="email" id="email" className="form-control"

                    onChange={setData}
                    required={true}

                  />
                </div>
                <div className="form-group">
                  <label for="name" className="text-info">name:</label><br />
                  <input type="text" name="name" id="name" className="form-control"
                    onChange={setData}
                    required={true}

                  />
                </div>

                <div className="form-group">
                  <label for="address" className="text-info">address:</label><br />
                  <input type="text" name="address" id="address" className="form-control"
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
                  <input type="submit" name="submit" className="btn btn-info btn-md" value="submit" />
                </div>
                <div id="register-link" className="text-right">
                  <Link to="/login">
                    <a className="text-info">Already have an account</a>
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

