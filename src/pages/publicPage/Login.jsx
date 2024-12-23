import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';
const Login = () => {

  const [user, setUser] = useState({
    email: "",
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
      const response = await fetch(`${API}/api/auth/login`,{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
     });
     const res_data = await response.json();
    //  console.log(res_data);

     if(response.ok){

      storeTokenInLS(res_data.token)

      setUser({
        email: "",
        password:""
      });
      toast.success("Login Successfully")
      navigate("/")  
     }
     else{
       toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
     }
     
    //  console.log(response)

    } catch (error) {
      alert("Invalid credential")
      console.log("login ", error);
    }
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