import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../services/user';
import { addToken } from '../feature/authSlice';
import { LogIn, ArrowLeft } from 'lucide-react';

const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { email, password };
        const user = await loginUser(userData);
        if (user.status === "success") {
            alert("User signed in successfully");
            dispatch(addToken(user.data.token));
            navigate("/");
        } else {
            alert(user.error);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-4 relative">
            <button
                onClick={() => navigate("/")}
                className="absolute top-4 left-4 flex items-center text-gray-300 hover:text-white transition-colors duration-200"
            >
                <ArrowLeft className="mr-2" size={20} />
                <span>Back</span>
            </button>
            <section className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h2 className="text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">
                    Welcome Back
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-white"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            aria-label="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-white"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            aria-label="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-end">
                        <div className="text-sm">
                            <Link to="/forgot-password" className="font-medium text-indigo-400 hover:text-indigo-300">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>
                    <div>
                        <button
                            className="w-full flex items-center justify-center bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
                            type="submit"
                        >
                            <LogIn className="mr-2" size={18} />
                            Sign In
                        </button>
                    </div>
                </form>
                <p className="mt-8 text-center text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-semibold text-indigo-400 hover:text-indigo-300 transition">
                        Sign up
                    </Link>
                </p>
            </section>
        </main>
    );
};

export default Signin;