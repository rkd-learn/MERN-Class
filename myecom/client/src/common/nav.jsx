import { useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"

export const Nav = () => {

  const navitation = useNavigate()

  const token = localStorage.getItem("ACCESS_TOKEN")

  useEffect(() => {
    if (token) {
      navitation("/product")
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("ACCESS_TOKEN")

    navitation("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/product">Product</NavLink>
          </li>

          {
            token ? (
              <li className="nav-item">
                <button className="nav-link" onClick={logout} >logout</button>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>


            )
          }
        </ul>

      </div>
    </nav>
  )
}

