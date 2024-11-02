import { BrowserRouter, Route, Routes } from 'react-router-dom';
// public layout
import PublicLayout from './components/layouts/Public-Layout';
import Home from './pages/publicPage/Home';
import About from './pages/publicPage/About';
import Services from './pages/publicPage/Services';
import Contact from './pages/publicPage/Contact';
import Login from './pages/publicPage/Login';
import Register from './pages/publicPage/Register';
import PageNotFound from './pages/publicPage/PageNotFound';
import { Logout } from './pages/publicPage/Logout';

// Admin layout
import AdminPanel from './components/layouts/admin-layout';
import Dashboard from './pages/adminPage/Dashboard';
import AdminContacts from './pages/adminPage/Admin-Contacts';
import AdminUsers from './pages/adminPage/admin-users';
import UpdatePage from './pages/adminPage/UpdatePage';
import AddingBooks from './pages/adminPage/AddingBooks';
import InventoryPage from './pages/adminPage/InventoryPage';
import UpdateBook from './pages/adminPage/UpdateBooks';


// Book-store layout
import BookStoreLayout from './components/layouts/Book-store-layout';
import BookStore from './pages/bookStorePage/Book-store';
import ContentPage from './pages/bookStorePage/Content-page';




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
        <Route element={<BookStoreLayout />}>
          <Route path="/bookstore" element={<BookStore />} />
          <Route path="/bookStore/books/:id" element={<ContentPage />} />
        </Route> 

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminPanel />}>
          <Route path="dashboard" element={<Dashboard />} />

          {/* users */}
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="users/:id/edit" element={<UpdatePage />} />

          {/* books */}
          <Route path="bookStore/books/:id/edit" element={<UpdateBook />} />
          <Route path="inventory" element={<InventoryPage/>} />

          {/* Adding a books */}
          <Route path="addBooks" element={<AddingBooks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;