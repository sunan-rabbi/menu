'use client';

import { Share2, MessageCircle, Heart, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <div>
                        <h3 className="text-2xl font-bold text-teal-600 mb-4">RestaurantPro</h3>
                        <p className="text-gray-400 mb-4">
                            Your trusted partner for delicious food and fast delivery. Quality meals, exceptional service.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600">
                                <Share2 className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600">
                                <MessageCircle className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600">
                                <Heart className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#home" className="text-gray-400 hover:text-teal-600">Home</a></li>
                            <li><a href="#menu" className="text-gray-400 hover:text-teal-600">Menu</a></li>
                            <li><a href="#services" className="text-gray-400 hover:text-teal-600">Services</a></li>
                            <li><a href="#about" className="text-gray-400 hover:text-teal-600">About Us</a></li>
                            <li><a href="#contact" className="text-gray-400 hover:text-teal-600">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Order Management</h4>
                        <ul className="space-y-2">
                            <li><a href="#track" className="text-gray-400 hover:text-teal-600">Track Order</a></li>
                            <li><a href="#history" className="text-gray-400 hover:text-teal-600">Order History</a></li>
                            <li><a href="#favorites" className="text-gray-400 hover:text-teal-600">Favorites</a></li>
                            <li><a href="#schedule" className="text-gray-400 hover:text-teal-600">Schedule Order</a></li>
                            <li><a href="#catering" className="text-gray-400 hover:text-teal-600">Catering</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-start">
                                <MapPin className="w-5 h-5 mr-2 mt-1 text-teal-600" />
                                <span>123 Restaurant Street, Food City, FC 12345</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="w-5 h-5 mr-2 text-teal-600" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="w-5 h-5 mr-2 text-teal-600" />
                                <span>info@restaurantpro.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm mb-4 md:mb-0">
                            &copy; 2025 RestaurantPro. All rights reserved.
                        </p>
                        <div className="flex space-x-6 text-sm text-gray-400">
                            <a href="#privacy" className="hover:text-teal-600">Privacy Policy</a>
                            <a href="#terms" className="hover:text-teal-600">Terms of Service</a>
                            <a href="#cookies" className="hover:text-teal-600">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
