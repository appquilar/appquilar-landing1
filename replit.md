# Appquilar - Event Equipment Rental Platform

## Overview

Appquilar is a comprehensive web platform that connects event organizers with equipment rental companies. The application facilitates the discovery, booking, and management of event equipment rentals, serving both end users looking to rent equipment and businesses offering rental services.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Full-Stack Architecture
The application follows a modern full-stack architecture with clear separation between client and server:

**Frontend**: React-based single-page application using Vite as the build tool
**Backend**: Express.js server with TypeScript
**Database**: PostgreSQL with Drizzle ORM
**Styling**: Tailwind CSS with shadcn/ui component library
**State Management**: React Query for server state management

### Monorepo Structure
- `client/` - Frontend React application
- `server/` - Backend Express.js API
- `shared/` - Shared schemas and types between client and server

## Key Components

### Frontend Architecture
- **React with TypeScript** for type-safe component development
- **Vite** for fast development and optimized builds
- **Wouter** for lightweight client-side routing
- **shadcn/ui** component library built on Radix UI primitives
- **Framer Motion** for animations and transitions
- **React Hook Form** with Zod validation for form handling
- **React Query** for API state management and caching

### Backend Architecture
- **Express.js** server with TypeScript
- **Drizzle ORM** for database operations and migrations
- **Zod** for request/response validation
- **RESTful API** design with proper error handling
- **Development middleware** for hot reloading and logging

### Database Design
The application uses PostgreSQL with three main tables:
- `users` - Basic user authentication (username/password)
- `user_registrations` - User interest registrations (name/email)
- `company_registrations` - Company service provider registrations

### Component Architecture
- **UI Components**: Reusable components following atomic design principles
- **Feature Components**: Business logic components (dashboard, registration forms)
- **Page Components**: Route-level components that compose features
- **Layout Components**: Navigation, footer, and structural elements

## Data Flow

### Registration Flow
1. Users can register interest via user registration form
2. Companies can apply to provide services via company registration form
3. Form data is validated on both client and server using Zod schemas
4. Successful registrations are stored in PostgreSQL database
5. Users receive confirmation feedback via toast notifications

### Dashboard Demo Flow
The application includes a comprehensive dashboard preview system:
1. Animated welcome sequence introduces users to the dashboard
2. Interactive navigation between different dashboard views
3. Mock data displays rental statistics, product management, and calendar views
4. Simulated real-time updates and state changes

### Development Flow
- Vite dev server handles frontend development with HMR
- Express server runs API endpoints with auto-reload via tsx
- Shared schemas ensure type consistency between frontend and backend

## External Dependencies

### Core Framework Dependencies
- **React ecosystem**: React 18, React DOM, React Query
- **Build tools**: Vite, TypeScript, esbuild
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Database**: Drizzle ORM, @neondatabase/serverless, connect-pg-simple

### UI and UX Libraries
- **Component library**: Complete shadcn/ui component set
- **Icons**: Lucide React icon library
- **Animations**: Framer Motion for smooth transitions
- **Forms**: React Hook Form with @hookform/resolvers
- **Validation**: Zod for schema validation

### Development Tools
- **Runtime**: Node.js with tsx for TypeScript execution
- **Database tools**: Drizzle Kit for migrations and schema management
- **Code quality**: TypeScript strict mode configuration

## Deployment Strategy

### Build Process
1. **Frontend build**: Vite compiles React app to static assets in `dist/public`
2. **Backend build**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations applied via `npm run db:push`

### Production Setup
- Server serves static frontend assets in production
- Environment-based configuration for database connections
- Separate development and production build processes

### Development Environment
- Concurrent development servers for frontend and backend
- Hot module replacement for rapid development
- Shared TypeScript configuration across client/server
- Path aliases for clean import statements

### Database Management
- Drizzle ORM provides type-safe database operations
- Environment variable configuration for database URL
- Migration system for schema changes
- PostgreSQL dialect with Neon serverless support

The application architecture prioritizes developer experience with TypeScript throughout, modern tooling, and clear separation of concerns while maintaining the flexibility to scale as a real-world rental platform.