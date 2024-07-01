import React, { useState } from 'react';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', { name, email, message });
        // Clear form fields after submission
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl p-8 space-y-8">
                <h1 className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 text-center">
                    Contact Us
                </h1>
                <p className="text-gray-300 text-lg leading-relaxed text-center">
                    Have any questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows="6"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="flex items-center bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-md transition duration-300 ease-in-out"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
