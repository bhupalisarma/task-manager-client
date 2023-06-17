import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-500">
            <header className="text-white text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to Task Manager</h1>
                <p className="text-lg">Get started by logging in or registering</p>
            </header>
            <div className="mt-6">
                <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-4 rounded">
                    Login
                </Link>
                <Link to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Register
                </Link>
            </div>
        </div>
    );
}

export default Home;
