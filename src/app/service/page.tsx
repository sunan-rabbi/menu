'use client';

import { UtensilsCrossed, Truck, Calendar, Users } from 'lucide-react';

interface Service {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    features: string[];
}

const ServiceCard = ({ service }: { service: Service }) => (
    <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
        <div className="flex justify-center mb-6">
            <div className="bg-teal-100 p-4 rounded-full">
                {service.icon}
            </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{service.title}</h3>
        <p className="text-gray-600 mb-6 text-center">{service.description}</p>
        <ul className="space-y-3">
            {service.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                    <span className="text-teal-600 mr-2">✓</span>
                    <span className="text-gray-700">{feature}</span>
                </li>
            ))}
        </ul>
    </div>
);

const ServicePage = () => {
    const services: Service[] = [
        {
            id: 1,
            title: "Dine-In Experience",
            description: "Enjoy our comfortable ambiance with exceptional table service",
            icon: <UtensilsCrossed className="w-8 h-8 text-teal-600" />,
            features: [
                "Premium seating arrangements",
                "Live music on weekends",
                "Personalized service",
                "Special occasion setups"
            ]
        },
        {
            id: 2,
            title: "Delivery Service",
            description: "Fast and reliable delivery right to your doorstep",
            icon: <Truck className="w-8 h-8 text-teal-600" />,
            features: [
                "30-minute delivery guarantee",
                "Track your order in real-time",
                "Contactless delivery option",
                "Free delivery on orders over $25"
            ]
        },
        {
            id: 3,
            title: "Event Catering",
            description: "Professional catering services for all your special occasions",
            icon: <Calendar className="w-8 h-8 text-teal-600" />,
            features: [
                "Customized menu planning",
                "Professional staff",
                "Equipment and setup included",
                "Events from 10 to 500 guests"
            ]
        },
        {
            id: 4,
            title: "Private Events",
            description: "Book our venue for your private gatherings and celebrations",
            icon: <Users className="w-8 h-8 text-teal-600" />,
            features: [
                "Private dining rooms",
                "Customizable decorations",
                "Dedicated event coordinator",
                "Audio-visual equipment available"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-teal-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-5xl font-bold mb-4">Our Services</h1>
                    <p className="text-xl text-teal-50">Comprehensive dining solutions tailored to your needs</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>

                <div className="bg-teal-600 text-white rounded-xl p-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Need a Custom Service?</h2>
                    <p className="text-xl text-teal-50 mb-6">
                        We're here to create a personalized solution for your unique requirements
                    </p>
                    <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors">
                        Contact Us Today
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServicePage;
