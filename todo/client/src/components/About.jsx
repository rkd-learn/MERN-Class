
import { UserContext } from "./context/UserContext"

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <UserContext.Consumer>
        {
          ({ user }) => (
            <div>
              Email : {user.email}
            </div>
          )
        }
      </UserContext.Consumer>
    </div>
  )
}

export default About
