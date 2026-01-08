'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, Leaf, ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react';

interface MenuItem {
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
    image: string;
    isVegetarian: boolean;
    rating: number;
    ingredients?: string[];
    nutritionalInfo?: {
        calories: number;
        protein: string;
        carbs: string;
        fat: string;
    };
}

const MenuDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const fetchMenuItem = async () => {
        try {
            const response = await fetch(`/api/menu/${params.id}`);
            const data = await response.json();
            setMenuItem(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching menu item:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenuItem();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    const handleQuantityChange = (change: number) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        console.log(`Adding ${quantity} x ${menuItem?.name} to cart`);
        alert(`Added ${quantity} x ${menuItem?.name} to cart!`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading menu item...</p>
                </div>
            </div>
        );
    }

    if (!menuItem) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Menu Item Not Found</h2>
                    <button
                        onClick={() => router.push('/menu')}
                        className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700"
                    >
                        Back to Menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-teal-600 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-white hover:text-teal-100 mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Menu
                    </button>
                    <h1 className="text-4xl font-bold">{menuItem.name}</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="relative">
                        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src={menuItem.image}
                                alt={menuItem.name}
                                fill
                                className="object-cover"
                            />
                            {menuItem.isVegetarian && (
                                <div className="absolute top-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg">
                                    <Leaf className="w-6 h-6" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                <span className="ml-1 text-gray-900 font-semibold">{menuItem.rating}</span>
                            </div>
                            <span className="text-sm text-gray-500 bg-gray-100 px-4 py-1 rounded-full">
                                {menuItem.category}
                            </span>
                            {menuItem.isVegetarian && (
                                <span className="text-sm text-green-700 bg-green-100 px-4 py-1 rounded-full font-semibold">
                                    Vegetarian
                                </span>
                            )}
                        </div>

                        <div className="mb-6">
                            <span className="text-4xl font-bold text-teal-600">
                                ${menuItem?.price}
                            </span>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
                            <p className="text-gray-600 leading-relaxed">{menuItem.description}</p>
                        </div>

                        {menuItem.ingredients && menuItem.ingredients.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-3">Ingredients</h2>
                                <div className="flex flex-wrap gap-2">
                                    {menuItem.ingredients.map((ingredient, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                        >
                                            {ingredient}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {menuItem.nutritionalInfo && (
                            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                                <h2 className="text-xl font-bold text-gray-900 mb-3">Nutritional Information</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-600 text-sm">Calories</p>
                                        <p className="text-gray-900 font-semibold">{menuItem.nutritionalInfo.calories} kcal</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 text-sm">Protein</p>
                                        <p className="text-gray-900 font-semibold">{menuItem.nutritionalInfo.protein}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 text-sm">Carbohydrates</p>
                                        <p className="text-gray-900 font-semibold">{menuItem.nutritionalInfo.carbs}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 text-sm">Fat</p>
                                        <p className="text-gray-900 font-semibold">{menuItem.nutritionalInfo.fat}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="border-t pt-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Quantity</h3>
                            <div className="flex items-center gap-4 mb-6">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors"
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="w-5 h-5" />
                                </button>
                                <span className="text-2xl font-bold text-gray-900 w-12 text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <span className="text-gray-600">Total:</span>
                                <span className="text-3xl font-bold text-teal-600">
                                    ${(menuItem.price * quantity).toFixed(2)}
                                </span>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-teal-600 text-white py-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuDetailPage;
