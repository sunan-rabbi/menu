'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-teal-600">RestaurantPro</h1>
                    </div>

                    <div className="hidden md:flex space-x-8">
                        <a href="#home" className="text-gray-700 hover:text-teal-600">Home</a>
                        <a href="#menu" className="text-gray-700 hover:text-teal-600">Menu</a>
                        <a href="#services" className="text-gray-700 hover:text-teal-600">Services</a>
                        <a href="#orders" className="text-gray-700 hover:text-teal-600">Orders</a>
                        <a href="#contact" className="text-gray-700 hover:text-teal-600">Contact</a>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
                            Order Now
                        </button>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-teal-600 focus:outline-none"
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <a href="#home" className="block px-3 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-md">Home</a>
                        <a href="#menu" className="block px-3 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-md">Menu</a>
                        <a href="#services" className="block px-3 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-md">Services</a>
                        <a href="#orders" className="block px-3 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-md">Orders</a>
                        <a href="#contact" className="block px-3 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-md">Contact</a>
                        <button className="w-full text-left px-3 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
                            Order Now
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
