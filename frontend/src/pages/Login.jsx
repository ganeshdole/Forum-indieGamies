import React from 'react';

const Signin = () => {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 p-4">
            <section className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h2 className="text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    Welcome Back
                </h2>
                <form className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            aria-label="Email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            aria-label="Password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="/forgot-password" className="font-medium text-purple-600 hover:text-purple-500">
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
                <div className="mt-6 flex items-center justify-center">
                    <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
                    <span className="flex-shrink mx-4 text-gray-600">or continue with</span>
                    <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
                </div>
                <div className="mt-6 flex justify-center space-x-4">
                    <button aria-label="Sign in with Facebook" className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 transition">
                        <svg className="h-5 w-5 fill-current text-white" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </button>
                    <button aria-label="Sign in with Google" className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 transition">
                        <svg className="h-5 w-5 fill-current text-white" viewBox="0 0 24 24">
                            <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
                        </svg>
                    </button>
                    <button aria-label="Sign in with GitHub" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-800 transition">
                        <svg className="h-5 w-5 fill-current text-white" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                    </button>
                </div>
                <p className="mt-8 text-center text-gray-600">
                    Don't have an account?{' '}
                    <a href="/register" className="font-semibold text-purple-600 hover:text-purple-500 transition">
                        Sign up
                    </a>
                </p>
            </section>
        </main>
    );
};

export default Signin;
