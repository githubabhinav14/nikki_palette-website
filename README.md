# Alex Artiste - Art Portfolio Website 🎨

A beautiful, modern art portfolio website built with Next.js 14, MongoDB, and Resend email integration. Features stunning animations, responsive design, and a complete commission management system.

## 🌟 Features

### Core Features
- **Hero Section** - Eye-catching landing page with animated elements
- **Portfolio Gallery** - Filterable gallery with 5 categories:
  - Portraits
  - T-Shirt Art
  - Paintings
  - Sketches
  - Digital Art
- **About Section** - Artist bio, skills, and tools
- **Services Section** - 6 commission services with pricing
- **Testimonials** - Client reviews with star ratings
- **FAQ Section** - Accordion-style frequently asked questions
- **Contact Form** - Working contact form with email integration

### Technical Features
- ✅ Next.js 14 with App Router
- ✅ MongoDB database integration
- ✅ Resend email service for contact form
- ✅ Framer Motion animations
- ✅ Shadcn/ui components
- ✅ Tailwind CSS with custom cream & gold theme
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ SEO optimized with meta tags
- ✅ Lazy loading images
- ✅ Smooth scrolling navigation
- ✅ Custom scrollbar styling
- ✅ Parallax effects

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally
- Yarn package manager
- Resend API key

### Installation

1. **Install Dependencies**
   ```bash
   yarn install
   ```

2. **Environment Variables**
   
   The `.env` file is already configured with:
   ```
   MONGO_URL=mongodb://localhost:27017/art-portfolio
   RESEND_API_KEY=re_bf8huStc_F1t7E7W1uTcYXwMaQCDqDfVD
   ADMIN_EMAIL=nikithanarsingoju1@gmail.com
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

3. **Start the Development Server**
   ```bash
   yarn dev
   ```

4. **Open Browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
/app
├── app/
│   ├── api/[[...path]]/route.js    # Backend API routes
│   ├── page.js                     # Main frontend page
│   ├── layout.js                   # Layout with navbar & footer
│   └── globals.css                 # Global styles
├── components/
│   ├── ui/                         # Shadcn UI components
│   └── emails/
│       └── ContactFormEmail.jsx    # Email template
├── lib/
│   └── utils/                      # Utility functions
├── .env                            # Environment variables
├── package.json                    # Dependencies
└── tailwind.config.js              # Tailwind configuration
```

## 🎨 Design System

### Color Palette
- **Cream Tones**: Background and neutral colors
  - cream-50 to cream-900
- **Gold Accents**: Primary actions and highlights
  - gold-400, gold-600, gold-700

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## 📡 API Endpoints

### GET Endpoints

#### Get All Artworks
```bash
GET /api/artworks
```

#### Get Artworks by Category
```bash
GET /api/artworks?category=portraits
GET /api/artworks?category=tshirt
GET /api/artworks?category=paintings
GET /api/artworks?category=sketches
GET /api/artworks?category=digital
```

#### Get All Services
```bash
GET /api/services
```

#### Get All Testimonials
```bash
GET /api/testimonials
```

### POST Endpoints

#### Submit Contact Form
```bash
POST /api/contact
Content-Type: application/json

{
  "name": "Client Name",
  "email": "client@example.com",
  "phone": "+917673926708",
  "message": "Your message here"
}
```

#### Add Artwork (Admin)
```bash
POST /api/artworks
Content-Type: application/json

{
  "title": "Artwork Title",
  "category": "portraits",
  "imageUrl": "https://...",
  "description": "Description"
}
```

## 📧 Email Integration (Resend)

### Current Setup
- **API Key**: Configured in `.env`
- **From Email**: `onboarding@resend.dev` (default)
- **To Email**: `nikithanarsingoju1@gmail.com`

### For Production
1. Sign up at [resend.com](https://resend.com)
2. Verify your domain
3. Update `RESEND_API_KEY` in `.env`
4. Change `from` email in `/app/app/api/[[...path]]/route.js` to use your domain

### Test Mode Limitation
Currently, Resend test mode only allows sending to the account owner's email. To send to any email:
- Verify a domain at [resend.com/domains](https://resend.com/domains)
- Update the `from` address in the contact API route

## 🎯 Default Data

The database is automatically seeded with:
- **15 Artworks** (3 per category)
- **6 Services** (Custom Portraits, Paintings, T-Shirt Design, Digital Art, Sketches, Bulk/Commercial)
- **3 Testimonials** (5-star reviews)

## 🔧 Customization

### Update Personal Information

1. **Contact Details** (`/app/app/layout.js`):
   - Email: nikithanarsingoju1@gmail.com
   - Phone: 7673926708
   - Instagram: @nikki_palette
   - Location: New York City

2. **About Section** (`/app/app/page.js`):
   - Update bio text
   - Modify skills list
   - Change tools used

3. **Services Pricing**:
   - Edit via MongoDB or through the services API

### Add Your Own Images

Replace the placeholder image URLs in:
- `/app/app/api/[[...path]]/route.js` (initializeData function)
- Update artworks, services, and hero section images

### Customize Colors

Edit `/app/tailwind.config.js` to change the color scheme:
```js
colors: {
  cream: { ... },  // Background colors
  gold: { ... },   // Accent colors
}
```

## 📱 Mobile Responsiveness

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ✨ Animations

Built with Framer Motion:
- Fade-in effects on scroll
- Hover animations on images
- Smooth page transitions
- Gallery modal animations
- Button hover effects

## 🧪 Testing

### Test Contact Form
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "message": "Test message"
  }'
```

### Test Gallery Filters
- Click category filter buttons
- Should dynamically load artworks from database
- Modal should open when clicking on artwork

### Test Navigation
- All nav links should smooth scroll to sections
- Mobile menu button (visible on small screens)
- Footer links should work

## 🌐 Social Media Links

Update these in `/app/app/layout.js`:
- Instagram: https://instagram.com/nikki_palette
- WhatsApp: https://wa.me/917673926708

## 🎨 Image Sources

All placeholder images sourced from:
- [Unsplash](https://unsplash.com) - Free high-quality images
- [Pexels](https://pexels.com) - Free stock photos

## 📦 Dependencies

Key packages:
- `next@14.2.3` - React framework
- `mongodb@^6.6.0` - Database
- `resend@^4.0.1` - Email service
- `framer-motion@^11.15.0` - Animations
- `@react-email/components@^0.0.25` - Email templates
- `zod@^3.25.67` - Validation
- `shadcn/ui` - UI components
- `tailwindcss@^3.4.1` - Styling

## 🚧 Future Enhancements

Potential features to add:
- [ ] Admin dashboard for managing artworks
- [ ] Image upload functionality
- [ ] Blog section
- [ ] Shopping cart for prints
- [ ] Client portal for commission tracking
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Analytics integration

## 📄 License

This project is open source and available for personal and commercial use.

## 👨‍🎨 Contact

**Alex Artiste**
- Email: nikithanarsingoju1@gmail.com
- Phone: 7673926708
- Instagram: @nikki_palette
- Location: New York City

---

Built with ❤️ using Next.js, MongoDB, and Resend
