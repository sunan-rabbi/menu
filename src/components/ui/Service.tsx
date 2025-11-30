'use client';

import { Zap, MapPin, CreditCard, Sparkles, Settings, Clock } from 'lucide-react';

const Service = () => {
    const services = [
        {
            title: 'Fast Delivery',
            description: 'Get your orders delivered within 30 minutes',
            icon: Zap,
        },
        {
            title: 'Order Tracking',
            description: 'Track your order in real-time from kitchen to doorstep',
            icon: MapPin,
        },
        {
            title: 'Easy Payment',
            description: 'Multiple payment options for your convenience',
            icon: CreditCard,
        },
        {
            title: 'Quality Food',
            description: 'Fresh ingredients and chef-prepared meals',
            icon: Sparkles,
        },
        {
            title: 'Custom Orders',
            description: 'Customize your meals according to your preferences',
            icon: Settings,
        },
        {
            title: '24/7 Support',
            description: 'Customer support available round the clock',
            icon: Clock,
        },
    ];

    return (
        <section id="services" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our <span className="text-teal-600">Services</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        We provide comprehensive restaurant order management services to ensure the best dining experience
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white border-2 border-gray-100 rounded-xl p-8 hover:border-teal-600 hover:shadow-xl"
                            >
                                <div className="text-teal-600 mb-4">
                                    <Icon className="w-12 h-12" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600">
                                    {service.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-16 bg-teal-600 rounded-2xl p-12 text-center">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Order?
                    </h3>
                    <p className="text-xl text-teal-50 mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied customers and experience the best food delivery service in town
                    </p>
                    <button className="px-8 py-4 bg-white text-teal-600 rounded-lg hover:bg-gray-100 text-lg font-semibold shadow-lg">
                        Start Ordering Now
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Service;
