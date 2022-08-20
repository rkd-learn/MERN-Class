import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "./context/UserContext";

const Login = () => {

  const { setUser } = useContext(UserContext);

  const [searchParams, setSearchParams] = useSearchParams({
    name: "",
  });

  const name = searchParams.get("name");

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navitation = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    //TODO: Api hit and varify user credentials
    setUser({
      email,
      password
    });

    navitation('/dashboard', {
      state: {
        fromLogin: true,
        email,
      }
    });

  }



  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit} >
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"
            required
          />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>

          <label htmlFor="password">Password</label>
          <input type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password" placeholder="Password" required={true} />
        </div>
        <button type="submit" className="btn mt-2 btn-primary">Submit</button>
      </form>

      <input type="text" value={name} onChange={(e) => setSearchParams({
        name: e.target.value
      })} />

    </div >
  )
}

export default Login
