// src/components/Header.jsx
import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { AiOutlineMenu, AiOutlineClose, AiOutlineUser } from "react-icons/ai";

import imgLogo from "../assets/logo.png";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // UserContext cuida de limpar do localStorage
    navigate("/sign-in");
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuLinks = [
    { name: "Início", to: "/" },
    { name: "Imóveis", to: "/properties" },
    { name: "Sobre", to: "/about" },
    { name: "Contato", to: "/contact" },
  ];

  return (
    <header className="bg-blue-950 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={imgLogo} alt="Logo Imosmart" className="w-10 h-10 object-contain" />
          <span className="text-2xl font-bold text-white">Imosmart</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 relative">
          {menuLinks.map((link) => (
            <Link key={link.to} to={link.to} className="text-white hover:text-blue-300 transition">
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="relative bg-blue-950" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-white hover:text-blue-300 transition"
              >
                {/* Avatar com fallback */}
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span>{user.name}</span>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 animate-slideDown">
                  {user.isAdmin && (
                    <>
                      <Link to="/create-property" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>
                        Criar Imóvel
                      </Link>
                      <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>
                        Dashboard
                      </Link>
                      <Link to="/chat-admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>
                        Chat
                      </Link>
                      <Link to="admin/properties" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>
                        Gerenciar Imóveis
                      </Link>
                      <Link to="admin/users" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>
                        Usuários
                      </Link>
                    </>
                  )}
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>
                    Perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/sign-in" className="text-white font-medium hover:text-blue-300 transition">
              Entrar
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>
    </header>
  );
}
