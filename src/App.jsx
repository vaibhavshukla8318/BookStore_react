import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import { Logout } from './pages/Logout';
import AdminPanel from './components/layouts/admin-layout';
import AdminContacts from './pages/Admin-Contacts';
import AdminUsers from './pages/admin-users';
import PublicLayout from './components/layouts/Public-Layout';
// import AdminLayout;

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        {/* Admin Routes without Navbar and Footer */}
        <Route path="/admin" element={<AdminPanel />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
About