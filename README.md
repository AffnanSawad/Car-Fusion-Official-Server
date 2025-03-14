# **Fusion-Car Backend**

**Fusion-Car Backend** is the server-side application that supports the Fusion-Car platform. It handles the business logic for car listings, user authentication, booking management, and payment processing. Built using Node.js, Express, MongoDB, and integrated with Firebase for user authentication and Stripe for payment processing, this server-side application ensures secure and scalable operations.

## **Project Overview**

The backend of Fusion-Car handles:

- **User Authentication**: Firebase Authentication for secure user sign-up, login, and social media login (Google, Facebook).
- **Car Inventory Management**: Admins can manage car listings, update details, and add or remove cars from the database.
- **Bookings**: Users can make bookings for cars and services. Admins can manage, view, and delete bookings.
- **Payment System**: Stripe integration for handling payments for car purchases and services.
- **Security**: JSON Web Tokens (JWT) are used for user authentication and maintaining session integrity.

## **Technologies Used**

- **Backend Framework**: 
  - Node.js
  - Express.js
  - MongoDB (Database)

- **Authentication**: 
  - Firebase Authentication (for secure login and social media logins)
  - JWT (JSON Web Token) for session management and secure routing

- **Payment Integration**: 
  - Stripe (for handling payments)

- **Environment Variables**: 
  - dotenv (for managing sensitive API keys and environment configurations)

## **Setup Instructions**

To run the server locally, follow these steps:

### **Prerequisites**:
Ensure that you have the following installed:

- **Node.js** and **npm** (Node Package Manager)
- **MongoDB** (locally or use a cloud service like MongoDB Atlas)
- **Firebase Project** (for authentication)
- **Stripe Account** (for payment processing)

### **Steps**:

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/fusion-car-backend.git
    ```

2. Navigate to the project directory:

    ```bash
    cd fusion-car-backend
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root of the project and add the following environment variables:

    ```bash
    MONGO_URI=your_mongo_db_connection_string
    FIREBASE_API_KEY=your_firebase_api_key
    FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    FIREBASE_PROJECT_ID=your_firebase_project_id
    FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    FIREBASE_APP_ID=your_firebase_app_id
    STRIPE_SECRET_KEY=your_stripe_secret_key
    ```

5. Run the server:

    ```bash
    npm start
    ```

    The backend server will now be running on `http://localhost:5000`.

## **API Endpoints**

Here are the main API endpoints:

### **User Authentication**

- **POST /api/auth/signup**: User registration with email and password or social login (Google/Facebook).
- **POST /api/auth/login**: User login with email and password.
- **POST /api/auth/logout**: User logout.

### **Car Inventory Management (Admin only)**

- **GET /api/cars**: Get all available cars.
- **POST /api/cars**: Add a new car to the inventory.
- **PUT /api/cars/:id**: Update car details.
- **DELETE /api/cars/:id**: Delete a car from the inventory.

### **Bookings**

- **GET /api/bookings**: Get all user bookings (Admin access).
- **POST /api/bookings**: Create a new booking for a car/service.
- **DELETE /api/bookings/:id**: Delete a booking.

### **Payments**

- **POST /api/payment**: Initiate payment for a car or service booking via Stripe.
- **GET /api/payment/history**: Get user payment history (Admin access).

### **Admin Dashboard**

- **GET /api/admin/users**: Get a list of all users (Admin access).
- **GET /api/admin/bookings**: Get all bookings (Admin access).
- **GET /api/admin/payments**: Get all payment transactions (Admin access).

## **Security**

- **JWT Authentication**: JSON Web Tokens (JWT) are used to authenticate users and verify their identity. Tokens are sent with requests to secure routes.
- **Stripe**: Payment transactions are processed securely through the Stripe API, ensuring user financial data is handled safely.

## **Deployment**

For production deployment, you can use cloud services like **Heroku**, **AWS**, or **DigitalOcean**. Ensure that environment variables are securely managed on your cloud platform.

1. For deploying on **Heroku**, use the following commands:

    ```bash
    heroku create
    git push heroku master
    heroku config:set MONGO_URI=your_mongo_db_connection_string
    heroku config:set FIREBASE_API_KEY=your_firebase_api_key
    heroku config:set STRIPE_SECRET_KEY=your_stripe_secret_key
    ```

2. Alternatively, for **AWS** or **DigitalOcean**, follow their respective documentation for setting up Node.js applications with environment variables.

## **Contributing**

We welcome contributions! If you would like to contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Implement your changes.
4. Run tests (if applicable).
5. Commit your changes and push to your forked repository.
6. Create a pull request for review.

**Fusion-Car Backend** is designed to provide a scalable and secure platform for car buying, selling, and servicing, with a robust admin dashboard and easy-to-use payment integration. We invite contributions and suggestions to continue improving the platform.

