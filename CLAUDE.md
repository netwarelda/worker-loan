# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Worker Loans Management System - A full-stack application for managing worker information and loan payments. Built with React frontend and Express/MongoDB backend.

## Development Commands

### Frontend (from root directory)
```bash
# Start development server on http://localhost:3000
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Backend (from backend/ directory)
```bash
# Install dependencies first
cd backend && npm install

# Start server (no npm script defined, use node directly)
node server.js

# For development with auto-reload, install nodemon first:
npm install -D nodemon
# Then run:
npx nodemon server.js
```

### Running the Full Application
1. **Start MongoDB** - Ensure MongoDB is running on your system
2. **Start Backend** - In one terminal: `cd backend && node server.js`
3. **Start Frontend** - In another terminal: `npm start` (from root)
4. Access the app at http://localhost:3000

### Environment Setup
Create `backend/.env` file with:
```
MONGO_URI=your_mongodb_connection_string
PORT=5001
```

**Note**: Port 5000 is used by macOS Control Center (AirPlay), so the backend uses port 5001.

## Architecture

### Tech Stack
- **Frontend**: React 19.1.0, Tailwind CSS, React Router DOM, Axios
- **Backend**: Express 5.1.0, MongoDB/Mongoose 8.16.3
- **Build Tools**: Create React App (with Vite config present)

### Project Structure
```
/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AddWorkerModal.jsx    # Modal for adding workers
│   │   └── MakePaymentModal.jsx  # Modal for processing payments
│   ├── pages/              # Route-based page components
│   │   ├── Workers.jsx          # Worker listing page
│   │   └── Report.jsx           # Reporting page
│   └── App.js              # Main app with routing setup
└── backend/
    ├── models/
    │   └── Worker.js       # Mongoose schema for workers
    ├── routes/
    │   └── workerRoutes.js # API endpoints for worker operations
    └── server.js           # Express server configuration
```

### Key API Patterns
- Backend runs on port 5001 with CORS enabled
- Frontend API calls use Axios to `http://localhost:5001/api/*`
- Worker model includes fields for worker details and loan information
- RESTful endpoints in `/api/workers/*` for CRUD operations

### Styling Approach
- Tailwind CSS configured with custom primary color (#10b981)
- Dark mode support enabled (class-based)
- Component styles use Tailwind utility classes
- Custom CSS in `src/styles.css`, compiled output in `src/output.css`

### Development Workflow
1. Start MongoDB service
2. Run backend server from `backend/` directory
3. Run frontend dev server from root directory
4. Frontend proxies API requests to backend port 5001

### Testing
- Frontend: Uses Jest with React Testing Library (Create React App default)
- Backend: No test setup currently implemented

### Important Notes
- Project has both Create React App and Vite configurations - CRA is actively used
- No linting scripts defined - uses CRA's built-in ESLint config
- Backend requires manual server start (no npm script)
- Ensure MongoDB is running before starting backend