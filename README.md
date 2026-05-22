# Inventory Dashboard

A full-stack Inventory Management Dashboard built with React, Vite, and an Express backend. This application allows users to manage inventory, track orders, and handle customer data. 

## Features

- **Dashboard:** Overview of business statistics, including total revenue, active orders, low stock items, and revenue charts.
- **Inventory Management:** View, search, filter, and add new inventory items. Tracks stock levels and pricing.
- **Orders:** View and search through customer orders and their statuses (e.g., Delivered, Processing, Pending, Cancelled).
- **Customers:** Manage customer information, contact details, and locations.
- **REST API Backend:** Express server using `lowdb` for lightweight, JSON-based local data storage.

## Tech Stack

### Frontend
- **React (v19)** - UI Library
- **Vite** - Build Tool & Dev Server
- **Redux Toolkit** - State Management
- **React Router** - Navigation
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Recharts** - Charting library for dashboard analytics
- **Lucide React** - Iconography

### Backend
- **Express.js** - Web framework for Node.js
- **LowDB** - Lightweight JSON database
- **CORS** - Cross-Origin Resource Sharing middleware

## Getting Started

### Prerequisites
- Node.js installed on your machine.

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd inventory-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To run both the Vite frontend and the Express backend concurrently:

```bash
npm run dev
```

- The **Frontend** will be available at `http://localhost:5173` (or the port Vite specifies).
- The **Backend API** will run at `http://localhost:3001`.

### Other Scripts

- `npm run server`: Starts only the Express backend server using nodemon.
- `npm run build`: Builds the React frontend for production.
- `npm run preview`: Serves the production build locally.
- `npm run lint`: Runs ESLint to check for code quality.

## Project Structure

```
inventory-dashboard/
├── server/
│   └── server.js        # Express backend server and API routes
├── src/
│   ├── components/      # Reusable UI components
│   ├── features/        # Redux slices and feature-specific logic
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Main application pages (Dashboard, Inventory, Orders, Customers)
│   ├── App.jsx          # Root component
│   └── main.jsx         # React entry point
├── package.json         # Project metadata and scripts
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite configuration
```
