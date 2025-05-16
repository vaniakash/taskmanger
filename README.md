# TaskTreker - Task Management Application

A full-stack MERN application for task management with user authentication. Built with Next.js, Express, MongoDB, and Node.js.

## Features

- User authentication (signup, login)
- Create, read, update, and delete tasks
- Task status tracking (pending, in-progress, completed)
- Responsive design with Tailwind CSS
- JWT-based authentication
- Protected routes

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT

## Project Structure

```
tasktreker/
├── backend/                # Express backend
│   ├── middleware/         # Authentication middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── .env.example        # Environment variables example
│   ├── package.json        # Backend dependencies
│   └── server.js           # Main server file
├── frontend/               # Next.js frontend
│   ├── components/         # React components
│   ├── pages/              # Next.js pages
│   ├── styles/             # CSS styles
│   ├── utils/              # Utility functions
│   └── package.json        # Frontend dependencies
└── README.md               # Project documentation
```

## Installation & Setup

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local instance or MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example` and set your environment variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/tasktreker
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file and set your API URL:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Start the frontend development server:
   ```
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000` to access the application.

## Deployment

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the build command: `npm install`
4. Set the start command: `npm start`
5. Add the required environment variables

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Import the repository to Vercel
3. Set the required environment variables
4. Deploy

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Log in a user

### Tasks
- `GET /api/tasks` - Get all tasks for the logged-in user
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## License

This project is licensed under the MIT License. 