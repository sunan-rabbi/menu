import { NextResponse } from 'next/server';
import menuData from '@/db.json';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = parseInt(idParam);

  console.log(id);


  const menuItem = menuData.menu.find(item => item.id === id);
  console.log(menuItem);


  if (!menuItem) {
    return NextResponse.json(
      { error: 'Menu item not found' },
      { status: 404 }
    );
  }

  // Add optional fields for the detail page
  const enrichedMenuItem = {
    ...menuItem,
    ingredients: getIngredients(menuItem.name),
    nutritionalInfo: getNutritionalInfo(menuItem.name)
  };

  return NextResponse.json(enrichedMenuItem);
}

// Helper function to get ingredients based on menu item
function getIngredients(itemName: string): string[] {
  const ingredientsMap: { [key: string]: string[] } = {
    'Grilled Salmon': ['Atlantic Salmon', 'Lemon', 'Butter', 'Herbs', 'Olive Oil'],
    'Margherita Pizza': ['Pizza Dough', 'Tomato Sauce', 'Mozzarella', 'Fresh Basil', 'Olive Oil'],
    'Caesar Salad': ['Romaine Lettuce', 'Parmesan Cheese', 'Croutons', 'Caesar Dressing', 'Black Pepper'],
    'Beef Burger': ['Beef Patty', 'Lettuce', 'Tomato', 'Cheese', 'Special Sauce', 'Burger Bun'],
    'Chicken Tikka Masala': ['Chicken Breast', 'Tomato Sauce', 'Cream', 'Spices', 'Onions', 'Garlic'],
    'Vegetable Pasta': ['Pasta', 'Bell Peppers', 'Zucchini', 'Tomatoes', 'Garlic', 'Olive Oil'],
    'Chocolate Lava Cake': ['Dark Chocolate', 'Butter', 'Eggs', 'Sugar', 'Flour', 'Vanilla Ice Cream'],
    'Shrimp Tacos': ['Shrimp', 'Tortillas', 'Avocado', 'Salsa', 'Lime', 'Cilantro'],
    'Greek Salad': ['Tomatoes', 'Cucumber', 'Feta Cheese', 'Olives', 'Red Onion', 'Olive Oil'],
    'BBQ Ribs': ['Pork Ribs', 'BBQ Sauce', 'Coleslaw', 'Spices', 'Brown Sugar'],
    'Sushi Platter': ['Sushi Rice', 'Nori', 'Fresh Fish', 'Avocado', 'Cucumber', 'Wasabi', 'Ginger'],
    'Tiramisu': ['Ladyfingers', 'Mascarpone', 'Coffee', 'Cocoa Powder', 'Eggs', 'Sugar']
  };

  return ingredientsMap[itemName] || [];
}

// Helper function to get nutritional information
function getNutritionalInfo(itemName: string): { calories: number; protein: string; carbs: string; fat: string } | undefined {
  const nutritionMap: { [key: string]: { calories: number; protein: string; carbs: string; fat: string } } = {
    'Grilled Salmon': { calories: 367, protein: '39g', carbs: '0g', fat: '22g' },
    'Margherita Pizza': { calories: 250, protein: '11g', carbs: '33g', fat: '8g' },
    'Caesar Salad': { calories: 184, protein: '7g', carbs: '12g', fat: '13g' },
    'Beef Burger': { calories: 540, protein: '34g', carbs: '41g', fat: '25g' },
    'Chicken Tikka Masala': { calories: 435, protein: '32g', carbs: '18g', fat: '26g' },
    'Vegetable Pasta': { calories: 310, protein: '11g', carbs: '52g', fat: '7g' },
    'Chocolate Lava Cake': { calories: 450, protein: '6g', carbs: '58g', fat: '23g' },
    'Shrimp Tacos': { calories: 320, protein: '25g', carbs: '35g', fat: '10g' },
    'Greek Salad': { calories: 215, protein: '8g', carbs: '11g', fat: '16g' },
    'BBQ Ribs': { calories: 610, protein: '42g', carbs: '24g', fat: '38g' },
    'Sushi Platter': { calories: 380, protein: '18g', carbs: '58g', fat: '8g' },
    'Tiramisu': { calories: 400, protein: '8g', carbs: '42g', fat: '21g' }
  };

  return nutritionMap[itemName];
}
