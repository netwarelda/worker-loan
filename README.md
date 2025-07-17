# Worker Loans Management System

A full-stack application for managing worker information and loan payments. Built with React frontend and Express/MongoDB backend.

## Features

- Worker management (add, edit, view workers)
- Loan tracking and payment processing
- Reporting and analytics
- Responsive UI with Tailwind CSS

## Tech Stack

- **Frontend**: React 19.1.0, Tailwind CSS, React Router DOM
- **Backend**: Express 5.1.0, MongoDB with Mongoose 8.16.3
- **Development**: Create React App

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/netwarelda/worker-loan.git
cd worker-loan
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
cd ..
```

4. Set up environment variables:

Create a `backend/.env` file:
```
MONGO_URI=your_mongodb_connection_string
PORT=5001
```

**Note**: Port 5001 is used to avoid conflicts with macOS Control Center on port 5000.

### Running the Application

1. **Start MongoDB** (if running locally)

2. **Start the backend server**:
```bash
cd backend
node server.js
```

3. **Start the frontend** (in a new terminal):
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

### Frontend

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production

### Backend

- `node server.js` - Starts the Express server
- For development with auto-reload:
  ```bash
  npm install -D nodemon
  npx nodemon server.js
  ```

## Project Structure

```
/
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/             # Route-based page components
│   └── App.js             # Main app with routing
└── backend/
    ├── models/            # Mongoose schemas
    ├── routes/            # API endpoints
    └── server.js          # Express server configuration
```

## API Endpoints

- `GET /api/workers` - Get all workers
- `POST /api/workers` - Create new worker
- `PUT /api/workers/:id` - Update worker
- `DELETE /api/workers/:id` - Delete worker
- `POST /api/workers/:id/payment` - Process loan payment

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.