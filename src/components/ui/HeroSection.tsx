'use client';

const HeroSection = () => {
    return (
        <section id="home" className="pt-16 bg-teal-50 min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                            Delicious Food,
                            <span className="text-teal-600"> Delivered Fast</span>
                        </h1>
                        <p className="text-xl text-gray-600">
                            Experience the finest dining from the comfort of your home.
                            Order from our extensive menu and enjoy restaurant-quality meals delivered to your doorstep.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-8 py-3 bg-teal-600 rounded-lg hover:bg-teal-700 text-lg font-semibold shadow-lg">
                                Browse Menu
                            </button>
                            <button className="px-8 py-3 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 text-lg font-semibold">
                                View Orders
                            </button>
                        </div>
                        <div className="flex items-center gap-8 pt-4">
                            <div>
                                <p className="text-3xl font-bold text-teal-600">500+</p>
                                <p className="text-gray-600">Menu Items</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-teal-600">10k+</p>
                                <p className="text-gray-600">Happy Customers</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-teal-600">4.9⭐</p>
                                <p className="text-gray-600">Rating</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop"
                                alt="Delicious food"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
