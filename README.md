# NuxtBnB - Rental Property Platform

A rental property platform (Airbnb-like) built with Nuxt.js 2 that uses third-party services as the primary backend infrastructure.

## Features

- Property listings with search and filtering
- User authentication via Google OAuth
- Image upload and management
- Geospatial search capabilities
- Admin interface for property management

## Technology Stack

- **Nuxt.js 2.18.1** (Vue 2 based)
- **Tailwind CSS** with custom configuration
- **Algolia** - Primary data store and search engine
- **Google OAuth** - Authentication system
- **Google Maps API** - Location services
- **Cloudinary** - Image upload and management

## Architecture

This project uses **Algolia as the primary database** instead of traditional SQL/NoSQL databases. Data is stored across three Algolia indexes: `homes`, `reviews`, and `users`.

### Custom Module System

The project uses custom Nuxt modules for API endpoints:
- `/modules/auth.js` - JWT authentication middleware
- `/modules/algolia/` - API endpoints for user, homes, and search
- `/modules/cloudinary/` - Image upload signature API

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file with the following variables:
   ```
   GOOGLE_MAPS_API=your_google_maps_api_key
   ALGOLIA_APP_ID=your_algolia_app_id
   ALGOLIA_API_KEY=your_algolia_api_key
   ALGOLIA_API_CREATE_OBJECT_API_KEY=your_algolia_write_key
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
pages/admin/     # Admin routes (SPA mode)
plugins/         # dataApi.js, auth.client.js, maps.client.js
modules/         # Custom modules with API routes
store/auth.js    # Vuex store for auth state
data/            # Static JSON data files
```

## Authentication

The app uses Google Sign-In with JWT tokens stored in cookies. All `/api/*` routes are automatically protected by the auth module.

## Data Management

- **Read operations**: Frontend uses `$dataApi` plugin
- **Write operations**: Backend modules interact with Algolia REST API
- **Search**: Built on Algolia's search capabilities with geospatial support

## Development Notes

- Uses Nuxt 2 patterns (not Nuxt 3)
- No TypeScript - JavaScript only
- Admin routes are client-side only
- Component auto-import enabled
- Extensive Tailwind customization available