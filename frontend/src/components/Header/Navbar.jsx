import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Menu, X, Home, Info, Mail, LogIn, LogOut, UserPlus } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { removeToken } from '../../feature/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const { token } = useSelector((state) => state.authentication);

    const navItems = [
        { to: "/", text: "Home", icon: Home },
        { to: "/about", text: "About", icon: Info },
        { to: "/contact", text: "Contact", icon: Mail },
    ];

    const renderNavLinks = (mobile = false) => (
        <ul className={`${mobile ? 'flex flex-col space-y-4' : 'hidden lg:flex space-x-6 items-center'}`}>
            {navItems.map((item) => (
                <li key={item.to}>
                    <Link
                        to={item.to}
                        className="flex items-center text-gray-100 hover:text-indigo-300 transition duration-300 ease-in-out"
                        onClick={() => setIsOpen(false)}
                    >
                        <item.icon className="mr-2" size={18} />
                        {item.text}
                    </Link>
                </li>
            ))}
            {!token ? (
                <>
                    <li>
                        <Link
                            to="/register"
                            className="flex items-center px-4 py-2 font-semibold text-white bg-indigo-600 rounded-full transition duration-300 ease-in-out hover:bg-indigo-700"
                            onClick={() => setIsOpen(false)}
                        >
                            <UserPlus className="mr-2" size={18} />
                            Sign Up
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/login"
                            className="flex items-center px-4 py-2 font-semibold text-indigo-100 border border-indigo-400 rounded-full transition duration-300 ease-in-out hover:bg-indigo-600 hover:text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            <LogIn className="mr-2" size={18} />
                            Sign In
                        </Link>
                    </li>
                </>
            ) : (
                <li>
                    <button
                        onClick={() => {
                            dispatch(removeToken());
                            setIsOpen(false);
                        }}
                        className="flex items-center px-4 py-2 font-semibold text-white bg-red-600 rounded-full transition duration-300 ease-in-out hover:bg-red-700"
                    >
                        <LogOut className="mr-2" size={18} />
                        Sign Out
                    </button>
                </li>
            )}
        </ul>
    );

    return (
        <nav className="bg-gray-800 shadow-lg top-0 z-50 sticky w-full">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-3xl  font-bold text-white bg-indigo-600 px-3 py-1 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                        style={
                            { fontFamily: "Teko-Bold" }
                        }>
                        IndieGamie's
                    </Link>
                    {renderNavLinks()}
                    <button
                        className="lg:hidden text-gray-100 hover:text-indigo-300 transition duration-300 ease-in-out"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="lg:hidden bg-gray-700 shadow-xl">
                    <div className="container mx-auto px-4 py-4">
                        {renderNavLinks(true)}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;