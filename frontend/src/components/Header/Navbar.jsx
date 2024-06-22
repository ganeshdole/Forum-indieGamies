import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="bg-gray-900 shadow-lg  top-0 z-50 fixed w-full">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-3xl font-bold text-black font-magz bg-white p-2 rounded-lg">IndieGamie</Link>
                    <div className="hidden md:flex space-x-8 items-center">
                        <NavLinks />
                    </div>
                    <button className="md:hidden text-gray-300" onClick={() => setIsOpen(!isOpen)}>
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
    <ul className={`${mobile ? 'flex flex-col space-y-4' : 'flex space-x-8 items-center'}`}>
        <NavItem to="/" text="Home" />
        <NavItem to="/about" text="About" />
        <NavItem to="/contact" text="Contact" />
        <li>
            <Link to="/register" className="inline-block px-5 py-2 font-semibold text-white bg-indigo-600 rounded-full transition duration-300 ease-in-out hover:bg-indigo-700">
                Sign Up
            </Link>
        </li>
    </ul>
);

const NavItem = ({ to, text }) => (
    <li>
        <Link to={to} className="text-gray-300 hover:text-indigo-400 transition duration-300 ease-in-out">{text}</Link>
    </li>
);

export default Navbar;
