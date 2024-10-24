import { BrowserRouter, Route, Routes } from 'react-router-dom';
// public layout
import PublicLayout from './components/layouts/Public-Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import { Logout } from './pages/Logout';

// Admin layout
import AdminPanel from './components/layouts/admin-layout';
import AdminContacts from './pages/Admin-Contacts';
import AdminUsers from './pages/admin-users';
import UpdatePage from './pages/UpdatePage';

// Book-store layout
import BookStoreLayout from './components/layouts/Book-store-layout';
import BookStore from './pages/bookStorePage/Book-store';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          {/* page not found */}
          <Route path="*" element={<PageNotFound />} />
        </Route>

        {/* Book Store Routes */}
        <Route path="/bookStore" element={<BookStoreLayout />}>
          {/* <Route path="/bookstore" element={<BookStore />} /> */}
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminPanel />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="users/:id/edit" element={<UpdatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
About