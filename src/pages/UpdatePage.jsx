// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { useParams } from 'react-router-dom';
import {toast} from 'react-toastify'
import '../App.css';

const UpdatePage = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phone: '',
  });

  const params = useParams();
  const {authorizationToken, API} = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

 

   //  get User by id(single user)
   const getSingleUserData = async () =>{
    try {
     const response = await fetch(`${API}/api/admin/users/${params.id}`, {
       method: "GET",
       headers: {
         Authorization: authorizationToken
        }
      });
      const data = await response.json();
      console.log("User single data", data);
      setUserData(data);
     
    } catch (error) {
     console.log(error);
    }
  }



   useEffect(()=>{
    getSingleUserData();
   }, []);


   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/api/admin/users/update/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken
         },
         body: JSON.stringify(userData)
       });
      if(response.ok){
        toast.success("User updated successfully");
      }
      else{
        toast.error("Failed to update user");
      }
      
     } catch (error) {
      console.log(error);
     }
  };


  
  return (
    <div className="update-container">
      <h2>Update Your Profile</h2>
      <form className="update-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={userData.username}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={userData.phone}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="submit-btn">Update</button>
      </form>
    </div>
  );
};

export default UpdatePage;
