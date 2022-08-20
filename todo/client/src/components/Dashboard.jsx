import { useContext } from "react";
import { UserContext } from "./context/UserContext";

const Dashboard = () => {

  const { user } = useContext(UserContext);

  return (
    <div>
      {
        user.email ? <h1>Welcome {user.email}</h1> : <h1>Please login</h1>
      }
    </div>
  )
}

export default Dashboard
