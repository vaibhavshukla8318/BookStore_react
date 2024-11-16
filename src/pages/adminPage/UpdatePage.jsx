import { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./css/Admin.css";

const UpdatePage = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    isAdmin: false,
  });

  const params = useParams();
  const { authorizationToken, API } = useAuth();

  // Fetch single user data by ID
  const getSingleUserData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/users/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Handle isAdmin checkbox change
  const handleCheckboxChange = (e) => {
    setUserData({
      ...userData,
      isAdmin: e.target.checked, // Updates state based on checkbox state
    });
  };

  // Update user data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/api/admin/users/update/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        toast.success("User updated successfully");
      } else {
        toast.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  return (
    <div className="update-container">
      <h2>Update User Profile</h2>

      {/* Display if the user is an admin */}
      {userData.isAdmin && (
        <div className="admin-badge">
          <p style={{ color: "green", fontWeight: "bold" }}>This user is an Admin</p>
        </div>
      )}

      <form className="update-form" onSubmit={handleSubmit}>
        {/* Username Field */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter username"
            value={userData.username}
            onChange={handleInputChange}
          />
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>

        {/* Phone Field */}
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter phone number"
            value={userData.phone}
            onChange={handleInputChange}
          />
        </div>

        {/* isAdmin Checkbox */}
        <div className="form-group">
          <label htmlFor="isAdmin">Admin</label>
          <input
            type="checkbox"
            id="isAdmin"
            name="isAdmin"
            checked={userData.isAdmin}
            onChange={handleCheckboxChange}
          />
          <span>{userData.isAdmin ? "Yes" : "No"}</span>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdatePage;
