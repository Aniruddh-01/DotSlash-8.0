import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Chatbot from './chatbot';

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Chatbot />
    </>
  );
}

export default Layout;