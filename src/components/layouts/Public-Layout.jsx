// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer'

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <>
        {/* This will render the child routes */}
        <Outlet />
      </>
      <Footer />
    </>
  );
};

export default PublicLayout;
