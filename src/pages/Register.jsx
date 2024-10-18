import { useState } from "react";
import {Link} from 'react-router-dom';
import '../App.css'

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
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
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="username">username</label>
          <input type="text" name="username" placeholder="Username" id="username" autoComplete="off" value={user.username} onChange={handleInput} />
        </div>

        <div>
          <label htmlFor="email">email</label>
          <input type="email" name="email" placeholder="Email" id="email" autoComplete="off" value={user.email} onChange={handleInput} />
        </div>

        <div>
          <label htmlFor="phone">phone</label>
          <input type="number" name="phone" placeholder="Phone" id="phone" autoComplete="off" value={user.phone} onChange={handleInput} />
        </div>

        <div>
          <label htmlFor="password">password</label>
          <input type="password" name="password" placeholder="Password" id="password" autoComplete="off" value={user.password} onChange={handleInput} />
        </div>

        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}

export default Register