# Personal Expense Management Application

This application allows users to manage their personal expenses easily and efficiently. It is developed using Angular for the frontend, Node.js for the backend, and MongoDB as the database.

## Features

- User registration and authentication
- Add, edit, and delete expenses
- View expenses by category and date
- Generate reports and charts for expense analysis

## Requirements

- Node.js (version 14 or higher)
- MongoDB (version 4 or higher)

## Installation

Follow these steps to set up the project on your local machine:

1. Clone the repository:
    ```bash
    git clone https://github.com/29jbarrera/Gestion-de-Gastos-Personales.git
    ```

2. Navigate to the project directory:
    ```bash
    cd Gestion-de-Gastos-Personales
    ```

3. Install backend dependencies:
    ```bash
    cd backend
    npm install
    ```

4. Install frontend dependencies:
    ```bash
    cd ../frontend
    npm install
    ```

## Configuration

1. Set up your MongoDB database:
    - Ensure you have MongoDB running locally or on an accessible server.
    - Create a `.env` file in the `backend` directory with the following content, replacing the values as necessary:
        ```
        MONGODB_URI=mongodb://localhost:27017/your-database-name
        SECRET_KEY=your_secret_key
        ```

2. Configure the Angular development server:
    - Ensure the `angular.json` file is correctly configured to point to port 4200.

## Running the Application

1. Start the backend:
    ```bash
    cd backend
    npm start
    ```

2. Start the frontend:
    ```bash
    cd ../frontend
    npm start
    ```

3. Open your web browser and go to `http://localhost:4200` to view the application.

## Available Scripts

### Backend

- `npm start`: Starts the backend server in development mode.
- `npm run dev`: Starts the backend server with nodemon for automatic reload on changes.

### Frontend

- `npm start`: Starts the Angular development server.
- `ng build`: Compiles the Angular application for production.


Thank you for using this personal expense management application!
