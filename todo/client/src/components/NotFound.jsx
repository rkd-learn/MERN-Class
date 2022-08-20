
import { Link } from "react-router-dom"
import "../styles/error-page.css"

const NotFound = () => {
  return (
    <div className="error-page">
      <h1>404 Page Found</h1>
      <br />
      <Link to="/">Go To Home</Link>
    </div>
  )
}

export default NotFound
