'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Leaf } from 'lucide-react';

interface MenuItem {
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
    image: string;
    isVegetarian: boolean;
    rating: number;
}

// Container/Presentational Pattern Implementation

// Presentational Component - MenuCard (Pure UI)
const MenuCard = ({ item }: { item: MenuItem }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl">
        <div className="relative h-48 overflow-hidden">
            <Image
                src={item.image}
                alt={item.name}
                width={400}
                height={300}
                className="w-full h-full object-cover"
            />
            {item.isVegetarian && (
                <div className="absolute top-3 right-3 bg-green-500 text-white p-2 rounded-full">
                    <Leaf className="w-5 h-5" />
                </div>
            )}
        </div>
        <div className="p-6">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-bold text-gray-900">{item.name}</h3>
                <span className="text-2xl font-bold text-teal-600">${item.price.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-gray-600 font-semibold">{item.rating}</span>
                </div>
                <span className="text-gray-400">&quot;</span>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {item.category}
                </span>
            </div>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <button className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700">
                Add to Cart
            </button>
        </div>
    </div>
);

// Presentational Component - CategoryFilter (Pure UI)
const CategoryFilter = ({
    categories,
    selectedCategory,
    onCategoryChange
}: {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}) => (
    <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((category) => (
            <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-6 py-2 rounded-lg font-semibold ${
                    selectedCategory === category
                        ? 'bg-teal-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-teal-50 border-2 border-gray-200'
                }`}
            >
                {category}
            </button>
        ))}
    </div>
);

// Presentational Component - LoadingSpinner (Pure UI)
const LoadingSpinner = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
            <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading menu...</p>
        </div>
    </div>
);

// Container Component - MenuPage (Handles data fetching and state)
const MenuPage = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const response = await fetch('/api/menu');
            const data = await response.json();
            setMenuItems(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching menu:', error);
            setLoading(false);
        }
    };

    const categories = ['All', ...Array.from(new Set(menuItems.map(item => item.category)))];

    const filteredItems = selectedCategory === 'All'
        ? menuItems
        : menuItems.filter(item => item.category === selectedCategory);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-teal-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-5xl font-bold mb-4">Our Menu</h1>
                    <p className="text-xl text-teal-50">Discover our delicious selection of dishes</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item) => (
                        <MenuCard key={item.id} item={item} />
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-xl">No items found in this category</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuPage;
