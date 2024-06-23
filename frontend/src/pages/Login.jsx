import React from 'react';

const Signin = () => {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-4">
            <section className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h2 className="text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Welcome Back
                </h2>
                <form className="space-y-6">
                    <div>
                        <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            aria-label="Email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            aria-label="Password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        {/* <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                                Remember me
                            </label>
                        </div> */}
                        <div className="text-sm">
                            <a href="/forgot-password" className="font-medium text-purple-400 hover:text-purple-300">
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                    <div>
                        <button
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                            type="button"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <p className="mt-8 text-center text-gray-400">
                    Don't have an account?{' '}
                    <a href="/register" className="font-semibold text-purple-400 hover:text-purple-300 transition">
                        Sign up
                    </a>
                </p>
            </section>
        </main>
    );
};

export default Signin;
