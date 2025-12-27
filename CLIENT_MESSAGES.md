# Client-Developer Communication

## Client SMS Messages

**Message 1:**
```
Hi! I need a website for my restaurant. Want customers to browse our menu online and see what services we offer. Can you build something modern that works on phones?
```

**Message 2:**
```
Main features I need:
- Nice homepage with hero section
- Full menu page with photos, prices, ratings
- Services section (delivery, payments, tracking etc)
- Should be teal colored, clean and professional look
```

**Message 3:**
```
For the menu - customers should filter by category (appetizers, mains, desserts). Show vegetarian items with a green icon. Each item needs photo, name, price, description and star rating.
```

**Message 4:**
```
Top navigation should have: Home, Menu, Services, Orders, Contact. Make it sticky when scrolling. On mobile use hamburger menu. Add an "Order Now" button that stands out.
```

**Message 5:**
```
Services page - show 6 cards with icons: Fast Delivery, Order Tracking, Easy Payment, Quality Food, Custom Orders, 24/7 Support. Add hover effects on cards.
```

**Message 6:**
```
Footer needs our contact info (address, phone, email), social media icons, and quick links. Also add stats on homepage like "500+ Menu Items" and "10k+ Customers" to build trust. Thanks!
```

---

## Developer TODO List

### Task 1: Project Setup & Configuration
- [ ] Initialize Next.js project with TypeScript
- [ ] Install dependencies (Tailwind CSS, Radix UI, Lucide icons)
- [ ] Configure Tailwind with teal color scheme
- [ ] Set up project folder structure (components, app routes)
- [ ] Initialize Git repository

### Task 2: Build Core Layout Components
- [ ] Create responsive Navbar with mobile hamburger menu
- [ ] Implement sticky navigation on scroll
- [ ] Build Footer component with contact info and links
- [ ] Add social media icon integration
- [ ] Ensure mobile-first responsive design

### Task 3: Develop Homepage
- [ ] Create Hero Section with headline and CTA buttons
- [ ] Add high-quality food imagery
- [ ] Implement statistics showcase (500+ items, 10k+ customers, 4.9 rating)
- [ ] Build Services section with 6 cards and icons
- [ ] Add hover animations and card effects
- [ ] Implement Factory Pattern for service items

### Task 4: Build Menu Page with Filtering
- [ ] Create Menu page route (/menu)
- [ ] Set up API integration for menu data (fetch from backend)
- [ ] Implement category filtering system (All, Appetizers, Mains, Desserts)
- [ ] Build menu card component with image, price, rating, description
- [ ] Add vegetarian indicator (green leaf icon)
- [ ] Implement Container/Presentational Pattern (separate UI from logic)
- [ ] Create loading spinner component

### Task 5: API Integration & State Management
- [ ] Set up JSON Server or backend API endpoint
- [ ] Create fetchMenuItems function with error handling
- [ ] Implement loading states during data fetch
- [ ] Add TypeScript interfaces for MenuItem data structure
- [ ] Test API calls and error scenarios

### Task 6: Testing & Deployment
- [ ] Test responsive design on mobile, tablet, desktop
- [ ] Verify cross-browser compatibility (Chrome, Safari, Firefox, Edge)
- [ ] Test all interactive elements (filters, buttons, menu toggle)
- [ ] Optimize images and performance
- [ ] Deploy to Vercel or hosting platform
- [ ] Share demo link with client for approval
