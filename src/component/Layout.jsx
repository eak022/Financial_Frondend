// src/component/Layout.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SidebarMenu from './Sidebar';
import { Outlet } from 'react-router-dom';

function Layout() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`flex flex-col h-screen ${theme === "light" ? "bg-white" : "bg-gray-900"}`}>
      <header>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
      </header>
      <div className="flex flex-1">
        <SidebarMenu theme={theme} />
        <main className="flex-1 p-4">
          <Outlet /> {/* This renders the matched child route */}
        </main>
      </div>
    </div>
  );
}

export default Layout;
