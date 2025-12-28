'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission logic here
        alert('Thank you for contacting us! We will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-teal-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
                    <p className="text-xl text-teal-50">We'd love to hear from you</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                        <div className="flex justify-center mb-4">
                            <div className="bg-teal-100 p-4 rounded-full">
                                <MapPin className="w-6 h-6 text-teal-600" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Address</h3>
                        <p className="text-gray-600">123 Restaurant Street</p>
                        <p className="text-gray-600">Downtown, City 12345</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                        <div className="flex justify-center mb-4">
                            <div className="bg-teal-100 p-4 rounded-full">
                                <Phone className="w-6 h-6 text-teal-600" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                        <p className="text-gray-600">+1 (555) 765-4321</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                        <div className="flex justify-center mb-4">
                            <div className="bg-teal-100 p-4 rounded-full">
                                <Mail className="w-6 h-6 text-teal-600" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                        <p className="text-gray-600">info@restaurantpro.com</p>
                        <p className="text-gray-600">support@restaurantpro.com</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent resize-none"
                                    placeholder="Your message..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Opening Hours</h2>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <Clock className="w-6 h-6 text-teal-600 mr-3 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Monday - Friday</h3>
                                    <p className="text-gray-600">11:00 AM - 10:00 PM</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Clock className="w-6 h-6 text-teal-600 mr-3 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Saturday</h3>
                                    <p className="text-gray-600">10:00 AM - 11:00 PM</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Clock className="w-6 h-6 text-teal-600 mr-3 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Sunday</h3>
                                    <p className="text-gray-600">10:00 AM - 9:00 PM</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-teal-50 rounded-lg">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Need Immediate Assistance?</h3>
                            <p className="text-gray-600 mb-4">
                                For urgent inquiries or same-day reservations, please call us directly.
                            </p>
                            <a
                                href="tel:+15551234567"
                                className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                            >
                                Call Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
