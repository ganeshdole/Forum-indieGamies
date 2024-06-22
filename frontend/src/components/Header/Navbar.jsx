import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-3xl font-extrabold font-magz text-gray-900">IndieGamie</Link>
                    <div className="hidden md:flex space-x-6 items-center">
                        <NavLinks />
                    </div>
                    <button className="md:hidden text-gray-800" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                {isOpen && (
                    <div className="md:hidden mt-4">
                        <NavLinks mobile />
                    </div>
                )}
            </div>
        </nav>
    );
};

const NavLinks = ({ mobile }) => (
    <ul className={`${mobile ? 'flex flex-col space-y-4' : 'flex space-x-6 items-center'}`}>
        <NavItem to="/" text="Home" />
        <NavItem to="/about" text="About" />
        <NavItem to="/contact" text="Contact" />
        <li>
            <Link to="/register" className="inline-block px-4 py-2 font-semibold text-white bg-blue-600 rounded-full transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-800">
                Sign Up
            </Link>
        </li>
    </ul>
);

const NavItem = ({ to, text }) => (
    <li>
        <Link to={to} className="text-gray-800 hover:text-blue-600 transition duration-300 ease-in-out">{text}</Link>
    </li>
);

export default Navbar;