import { useState } from 'react';
import {Link} from 'react-router-dom';
const Login = () => {

  const [user, setUser] = useState({
    email: "",
    password:""
  })

  const handleInput = (e) => {
    console.log(e);

    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value
    });
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(user);
  }
  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="email">email</label>
          <input type="email" name="email" placeholder="Email" id="email" autoComplete="off" value={user.email} onChange={handleInput} />
        </div>

        <div>
          <label htmlFor="password">password</label>
          <input type="password" name="password" placeholder="Password" id="password" autoComplete="off" value={user.password} onChange={handleInput} />
        </div>

        <button type="submit">Login</button>
      </form>
      <p>Already have an account? <Link to="/register">Register</Link></p>
    </div>
  )
}

export default Login