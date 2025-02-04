import React from 'react';
import { Link } from 'react-router-dom';

const FirstPage = () => {
    return (
        <div className="bg-gray-50">
            {/* Header Section */}
            <header className="text-center py-12 bg-white">
                <h1 className="text-5xl font-semibold text-gray-800 mb-4">
                    Your <span className="text-indigo-600">intelligent</span> second brain.
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                    Record, organize, and access your notes with human-level accuracy, powered by AI.
                </p>
                <Link to="/login">
                    <button className="bg-red-600 text-white py-3 px-6 rounded-lg text-xl hover:bg-red-700 transition duration-300">
                        Tap to Record
                    </button>
                </Link>
            </header>

            {/* Features Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 px-8">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Record</h3>
                    <p className="text-gray-600 mb-4">
                        Record notes and meetings with human-level accuracy. Significantly more accurate than Apple and Otter.
                    </p>
                    <img src="record.DZwfdw1p.png" alt="Record Notes" className="shadow-box rounded-2xl w-full mt-6 xs:w-3/4 mx-auto xs:mt-3 xxs:w-[76%] xxxs:w-[88%] xxxs:mt-5" />
                    <p className="text-gray-500">Transcribe your voice with AI-powered technology.</p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Search</h3>
                    <p className="text-gray-600 mb-4">
                        Ask your AI assistant any questions based on your recorded notes, no matter the size.
                    </p>
                    <img src="download.png" alt="Ask AI" className="w-24 h-24 mx-auto mb-4" />
                    <p className="text-gray-500">Get insights from past notes with ease.</p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Share</h3>
                    <p className="text-gray-600 mb-4">
                        Share this Fabulous Application with your Loved Ones......
                    </p>
                    <img src="images.png" alt="Share Notes" className="w-24 h-24 mx-auto mb-4" />
                    <p className="text-gray-500">Collaborate effortlessly with others.</p>
                </div>
            </section>

            {/* Additional Information Section */}
            <section className="bg-indigo-600 text-white py-12 px-8 text-center">
                <h2 className="text-3xl font-semibold mb-4">Features & Specifications</h2>
                <ul className="text-lg space-y-2">
                    <li>✔️ AI-powered transcription with high accuracy.</li>
                    <li>✔️ Fast and seamless note sharing via integrations.</li>
                    <li>✔️ Access your notes from any device, anytime.</li>
                    <li>✔️ Fully secure data storage with privacy protection.</li>
                    <li>✔️ Collaborative sharing for teams and family.</li>
                </ul>
            </section>

            {/* Footer Section */}
            <footer className="bg-gray-800 text-white py-6">
                <div className="text-center">
                    <p>&copy; 2025 AI Notes. All rights reserved.</p>
                    <div className="mt-4">
                        <Link to="/terms" className="hover:text-indigo-400 mx-3">Terms & Privacy</Link>
                        <Link to="/contact" className="hover:text-indigo-400 mx-3">Contact</Link>
                        <Link to="/community" className="hover:text-indigo-400 mx-3">Community</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default FirstPage;
