# Menu Setup Instructions

This project uses JSON Server to provide a mock REST API for the menu items.

## Starting the Application

You need to run **two servers** simultaneously:

### 1. Start the JSON Server (in one terminal)
```bash
npm run json-server
```

This will start the JSON server on `http://localhost:3001`

### 2. Start the Next.js Development Server (in another terminal)
```bash
npm run dev
```

This will start the Next.js app on `http://localhost:3000`

## Accessing the Menu

- Visit `http://localhost:3000/menu` to see the menu page
- The menu data is fetched from `http://localhost:3001/menu`

## Menu API Endpoints

- `GET http://localhost:3001/menu` - Get all menu items
- `GET http://localhost:3001/menu/:id` - Get a specific menu item
- `GET http://localhost:3001/categories` - Get all categories
- `POST http://localhost:3001/menu` - Add a new menu item
- `PUT http://localhost:3001/menu/:id` - Update a menu item
- `DELETE http://localhost:3001/menu/:id` - Delete a menu item

## Menu Data

The menu data is stored in `db.json` and includes:
- 12 delicious menu items
- 8 categories (Main Course, Pizza, Salads, Burgers, Pasta, Desserts, Mexican, Japanese)
- Each item has: name, category, price, description, image, vegetarian status, and rating

## Features

- **Category Filtering**: Filter menu items by category
- **Beautiful Images**: Each item has a high-quality image from Unsplash
- **Vegetarian Badge**: Vegetarian items are marked with a leaf icon
- **Rating Display**: Each item shows its customer rating
- **Responsive Design**: Works on all screen sizes
- **Teal Color Scheme**: Modern teal/medium sea green color theme
