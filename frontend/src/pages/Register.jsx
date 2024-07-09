import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUser } from '../services/user';
import { UserPlus, ArrowLeft, Mail, Lock, User, Check, Eye, EyeOff } from 'lucide-react';
import { requestOtp, verifyOtp } from '../services/auth';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [otp, setOtp] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!isVerified) {
            setError('Please verify your email before registering');
            return;
        }

        const newUser = await createUser({
            username: formData.username,
            email: formData.email,
            password: formData.password,
        });

        if (newUser.status === "success") {
            alert("User created successfully");
            navigate("/login");
        } else {
            setError(newUser.error);
        }
    };

    const handleSendOtp = async () => {
        const email = formData.email;
        const result = await requestOtp(email);
        if (result.status === "success") {
            setIsEmailSent(true);
        } else {
            setError(result.error);
        }
    };

    const handleVerifyOtp = async () => {
        const email = formData.email;
        const result = await verifyOtp(email, otp);
        if (result.status === "success") {
            setIsVerified(true);
        } else {
            setError(result.error);
        }
    };

    const handleEditEmail = () => {
        setIsEmailSent(false);
        setIsVerified(false);
        setOtp('');
    };

    const isFormValid = () => {
        return (
            formData.username.trim() !== '' &&
            formData.email.trim() !== '' &&
            formData.password.trim() !== '' &&
            formData.confirmPassword.trim() !== '' &&
            isVerified
        );
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-4 relative">
            <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 flex items-center text-gray-300 hover:text-white transition-colors duration-200"
            >
                <ArrowLeft className="mr-2" size={20} />
                <span>Back</span>
            </button>
            <section className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h2 className="text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">Join Us</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="username" className="block text-gray-300 text-sm font-semibold">
                            Username
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Choose a username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-gray-300 text-sm font-semibold">
                            Email
                        </label>
                        <div className="relative flex gap-4">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                required
                            />
                            {isEmailSent && !isVerified ? (
                                <button
                                    type="button"
                                    onClick={handleEditEmail}
                                    className="px-4 py-2 rounded-lg font-semibold text-sm bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                                >
                                    Edit Email
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    disabled={isEmailSent}
                                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200 ${isEmailSent
                                        ? 'bg-green-500 text-white cursor-not-allowed'
                                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                        } w-fit`}
                                >
                                    {isEmailSent ? 'OTP Sent' : 'Send OTP'}
                                </button>
                            )}
                        </div>
                    </div>
                    {isEmailSent && !isVerified && (
                        <div className="space-y-2">
                            <label htmlFor="otp" className="block text-gray-300 text-sm font-semibold">
                                Enter OTP
                            </label>
                            <div className="flex space-x-2">
                                <input
                                    id="otp"
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="flex-grow pl-4 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={handleVerifyOtp}
                                    className="px-4 py-2 rounded-lg font-semibold text-sm bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200"
                                >
                                    Verify OTP
                                </button>
                            </div>
                        </div>
                    )}
                    {isVerified && (
                        <div className="text-green-500 text-sm flex items-center">
                            <Check className="mr-2" size={18} />
                            Email verified successfully!
                        </div>
                    )}
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-gray-300 text-sm font-semibold">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-10 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-semibold">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full pl-10 pr-10 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    {error && (
                        <div className="bg-red-500 text-white px-4 py-2 rounded-lg" role="alert">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={!isFormValid()}
                        className={`w-full flex items-center justify-center font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out ${isFormValid()
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                            : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                            }`}
                    >
                        <UserPlus className="mr-2" size={18} />
                        Create Account
                    </button>
                </form>
                <p className="mt-8 text-center text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 transition">
                        Log in
                    </Link>
                </p>
            </section>
        </main>
    );
};

export default Register;
