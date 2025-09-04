# 🗺️ GetView

**Modern web application for discovering and sharing scenic viewpoints** — an interactive map filled with beautiful places (viewpoints, lookouts, natural landmarks) with the ability to add new locations, categorize, and filter by interests.

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-v5-green?style=for-the-badge)](https://next-auth.js.org/)

</div>

---

## ✨ Features

### 🎯 **Currently Implemented**
- 🗺️ **Interactive map** with Leaflet/OpenStreetMap
- 🔐 **Google OAuth authentication** with NextAuth.js v5
- 📍 **GPS location** with automatic user centering
- 🆕 **Add viewpoints** with GPS coordinates and descriptions
- 👤 **User accounts** with place authorship tracking
- 🏷️ **Hashtag system** for categorization
- 🎨 **Professional hero design** with automatic redirect
- 📱 **Responsive design** for all devices
- 🌍 **Multilanguage support** (SK/EN)

### 🚀 **Upcoming Features**
- 📷 Photo upload for viewpoints
- ⭐ Rating and reviews system
- 🔍 Advanced filtering by categories
- 📊 Pin clustering for better performance
- 🏔️ AR navigation to viewpoints
- 📱 Progressive Web App (PWA)
- 🌐 Offline mode with synchronization

---

## 🛠️ Tech Stack

<table>
<tr>
<td><strong>Frontend</strong></td>
<td>
  <img src="https://img.shields.io/badge/Next.js-15.4.6-black?logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-19.1.0-blue?logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript" alt="TypeScript"/>
</td>
</tr>
<tr>
<td><strong>Styling</strong></td>
<td>
  <img src="https://img.shields.io/badge/TailwindCSS-4.0-blue?logo=tailwindcss" alt="TailwindCSS"/>
  <img src="https://img.shields.io/badge/Shadcn/UI-Components-black" alt="Shadcn/UI"/>
  <img src="https://img.shields.io/badge/Motion-Animations-purple" alt="Motion"/>
</td>
</tr>
<tr>
<td><strong>Database & ORM</strong></td>
<td>
  <img src="https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Drizzle-ORM-green" alt="Drizzle"/>
  <img src="https://img.shields.io/badge/Drizzle_Kit-Migrations-green" alt="Drizzle Kit"/>
</td>
</tr>
<tr>
<td><strong>Authentication</strong></td>
<td>
  <img src="https://img.shields.io/badge/NextAuth.js-v5_Beta-green" alt="NextAuth.js"/>
  <img src="https://img.shields.io/badge/Google-OAuth-red?logo=google" alt="Google OAuth"/>
  <img src="https://img.shields.io/badge/Drizzle-Adapter-green" alt="Drizzle Adapter"/>
</td>
</tr>
<tr>
<td><strong>Maps & Location</strong></td>
<td>
  <img src="https://img.shields.io/badge/Leaflet-1.9.4-green?logo=leaflet" alt="Leaflet"/>
  <img src="https://img.shields.io/badge/React_Leaflet-5.0-green" alt="React Leaflet"/>
  <img src="https://img.shields.io/badge/OpenStreetMap-Tiles-orange" alt="OpenStreetMap"/>
</td>
</tr>
<tr>
<td><strong>Development</strong></td>
<td>
  <img src="https://img.shields.io/badge/ESLint-9.0-purple?logo=eslint" alt="ESLint"/>
  <img src="https://img.shields.io/badge/Vercel-Analytics-black?logo=vercel" alt="Vercel Analytics"/>
</td>
</tr>
</table>

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database
- Google OAuth application (for authentication)

### 1. Clone Repository
```bash
git clone https://github.com/MatuxTV/getview_project.git
cd getview_project
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables Setup
Create `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/getview"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Database Migrations
```bash
# Generate migrations
npm run db:generate

# Run migrations
npm run db:migrate
```

### 5. Start Development Server
```bash
npm run dev
```

Application will be available at [http://localhost:3000](http://localhost:3000)

---

## 🗂️ Project Structure

```
getview/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Landing page
│   ├── [locale]/               # Internationalization
│   ├── map/                    # Map page (protected)
│   └── api/                    # API routes
│       ├── auth/              # NextAuth configuration
│       └── places/            # CRUD operations for places
│
├── components/                   # React components
│   ├── ui/                     # Shadcn/UI components
│   │   ├── hero.tsx           # Landing page hero section
│   │   └── button.tsx         # Base button component
│   ├── auth/                  # Authentication
│   │   ├── google-signin-button.tsx
│   │   └── auth-guard.tsx     # Route protection
│   ├── map/                   # Map components
│   │   ├── MapView.tsx        # Main map component
│   │   └── PlaceMarker.tsx    # Place markers
│   └── buttons/               # Action buttons
│       └── locateButton.tsx   # GPS location
│
├── lib/                         # Utilities and configuration
│   ├── auth.ts               # NextAuth configuration
│   ├── db.ts                 # Database connection
│   └── utils.ts              # Helper functions
│
├── src/                        # Database layer
│   └── schema.ts             # Drizzle schemas
│
├── locale/                     # Internationalization
│   ├── en.json              # English translations
│   └── sk.json              # Slovak translations
│
├── drizzle/                   # Database migrations (git ignored)
├── drizzle.config.ts         # Drizzle configuration
└── middleware.ts             # Next.js middleware
```

---

## 📡 API Endpoints

### Authentication
```typescript
// NextAuth.js endpoints
POST   /api/auth/signin       // Sign in
POST   /api/auth/signout      // Sign out  
GET    /api/auth/session      // Current session
```

### Places
```typescript
// Get all places
GET    /api/places
Response: Place[]

// Add new place
POST   /api/places
Body: {
  title: string
  description?: string
  latitude: number
  longitude: number
  hashtags?: string[]
}
Response: Place

// Get place by ID
GET    /api/places/[id]
Response: Place

// Update place
PUT    /api/places/[id]
Response: Place

// Delete place
DELETE /api/places/[id]
Response: { success: boolean }
```

### Data Types
```typescript
interface Place {
  id: number
  title: string
  description?: string
  latitude: number
  longitude: number
  userId: string
  createdAt: Date
  hashtags?: Hashtag[]
  user?: User
}

interface User {
  id: string
  name?: string
  email: string
  image?: string
}

interface Hashtag {
  id: number
  name: string
  color?: string
}
```

---

## 🗄️ Database Schema

```sql
-- Users (NextAuth tables)
CREATE TABLE "user" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT,
  "email" TEXT NOT NULL,
  "emailVerified" TIMESTAMP,
  "image" TEXT
);

-- Places/viewpoints
CREATE TABLE "places" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "latitude" REAL NOT NULL,
  "longitude" REAL NOT NULL,
  "userId" TEXT NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY ("userId") REFERENCES "user"("id")
);

-- Hashtags
CREATE TABLE "hashtags" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "color" TEXT DEFAULT '#3B82F6'
);

-- Many-to-many relationship
CREATE TABLE "place_hashtags" (
  "id" SERIAL PRIMARY KEY,
  "placeId" INTEGER NOT NULL,
  "hashtagId" INTEGER NOT NULL,
  FOREIGN KEY ("placeId") REFERENCES "places"("id"),
  FOREIGN KEY ("hashtagId") REFERENCES "hashtags"("id")
);
```

---

## 🌍 Internationalization

The application supports multilingual functionality using Next.js i18n:

```typescript
// Available languages
const locales = ['sk', 'en'] as const
const defaultLocale = 'sk'

// Usage in components
import { useTranslation } from '@/hooks/useTranslation'

function Component() {
  const t = useTranslation()
  return <h1>{t('hero.title')}</h1>
}
```

---

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub repository
2. Connect repository on [Vercel](https://vercel.com)
3. Set environment variables
4. Deploy automatically runs on every push

### Manual Build
```bash
npm run build
npm start
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🤝 Contributing

We welcome any help! To contribute:

1. **Fork** the repository
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'feat: add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Coding Standards
- TypeScript strict mode
- ESLint + Prettier configuration
- Conventional commits
- Components in PascalCase
- Hooks with `use` prefix

---

## 📝 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

---

## 👤 Author

**MatuxTV**
- GitHub: [@MatuxTV](https://github.com/MatuxTV)
- Email: [contact via GitHub profile](https://github.com/MatuxTV)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Leaflet](https://leafletjs.com/) for open-source maps
- [OpenStreetMap](https://www.openstreetmap.org/) for map data
- [Shadcn/UI](https://ui.shadcn.com/) for beautiful components
- [NextAuth.js](https://next-auth.js.org/) for authentication solution

---

<div align="center">

**⭐ If you like this project, don't forget to give it a star! ⭐**

**Thank you for your interest in GetView!** 🗺️✨

</div>
