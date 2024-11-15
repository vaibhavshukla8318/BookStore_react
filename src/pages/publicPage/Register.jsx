import { useState } from "react";
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import './css/Auth.css';

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password:""
  })

  const navigate = useNavigate();
  const {storeTokenInLS, API} = useAuth();

  const handleInput = (e) => {
    // console.log(e);

    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value
    });
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch(`${API}/api/auth/register`,{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
     });

     const res_data = await response.json();
     console.log("res from server" ,res_data.extraDetails);

     if(response.ok){
    //  stored the token in local storage
      storeTokenInLS(res_data.token)

      setUser({
        username:"", 
        email: "",
        phone: "",
        password:""});

        toast.success("Registration Successfully");
      navigate("/")  
     }
     else{
      toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
     }

     console.log(response)

    } catch (error) {
      console.log("register ", error);
    }
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