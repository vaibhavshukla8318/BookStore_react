import { useState } from 'react';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import '../App.css';


const defaultUserContact = {
  username: '',
  email: '',
  message: ''
}
const Contact = () => {
  const [contact, setContact] = useState(defaultUserContact);

  const [userData, setUserData] = useState(true);

  const {user, API} = useAuth();

  if(userData && user){
    setContact({
      username: user.username,
      email: user.email,
      message: ''
    });

    setUserData(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API}/api/form/contact`,{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
     });

     if(response.ok){
       setContact(defaultUserContact);
       const data = await response.json()
       console.log(data);
       toast.success("Form submitted successfully");
     }

    } catch (error) {
      toast.error("Message not send");
      console.log(error);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h2>Contact Us</h2>
        <img src="../../public/images/contactHeaderImage.jpg" alt="Contact Banner" className="contact-header-img" />
      </div>

      {/* Contact Form with Image */}
      <div className="form-section">
        <img src="../../public/images/contactImage.jpg" alt="Contact Image" className="contact-image" />

        <form onSubmit={handleSubmit} className="contact-form">
          {/* Username */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your name"
              value={contact.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={contact.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Message */}
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Enter your message"
              value={contact.message}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit">Send Message</button>
        </form>
      </div>

      {/* Embedded Map */}
      <div className="map-container">
        <iframe
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.0335236168533!2d-122.41941508468155!3d37.774929579758616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5ec1d139%3A0x2c3912797d92f847!2sSan+Francisco%2C+CA!5e0!3m2!1sen!2sus!4v1633402403735!5m2!1sen!2sus"
          width="100%"
          height="400"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
