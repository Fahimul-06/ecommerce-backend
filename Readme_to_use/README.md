# E-Commerce  Backend


## Description
This project is the backend for an e-commerce platform built with Node.js, Express.js, and MongoDB. It provides essential functionalities such as product management, user authentication, cart operations, order processing, and feedback submission. The platform also includes admin-specific features for managing products, customers, and orders, as well as tracking system performance through a dashboard.

---

## Features

### Customer Features
- **Browse Products**: Customers can view and search for products without logging in.
- **Cart Operations**:
  - Add or remove products to/from the cart without logging in.
  - Prevents duplicate product entries in the cart.
- **Checkout**:
  - Requires login to place an order.
  - Demo payment integration (uses Stripe test mode; no real payment processing).
- **Order Management**:
  - View order history and statuses (Pending, Confirmed, Delivered).
  - Download invoices for placed orders.
- **Feedback Submission**: Customers can submit feedback without logging in.

### Admin Features(I'll do this later, it's for future impliment)
- **User Management**:
  - Create an admin account using an API endpoint (`POST /api/admin/register`).
  - Manage customer details (view, edit, delete).
- **Product Management**: Add, view, edit, or delete products.
- **Order Management**:
  - View and delete orders.
  - Update order statuses.
- **Feedback Management**: View customer feedback.
- **Dashboard**: Displays the number of customers, products, and orders.

### Additional Features
- **Fraud Detection**:
  - Automatically deletes orders if the associated customer is removed by the admin.
  - Removes products from orders if the product is deleted by the admin.
- **Error Handling**: Prompts customers to add items to the cart if they attempt checkout with an empty cart.

---

## Installation and Setup

### Prerequisites
- Node.js installed ([Download Node.js](https://nodejs.org/))
- MongoDB installed and running ([Install MongoDB](https://www.mongodb.com/docs/manual/installation/))

### Clone the Repository
   ```bash
   git clone https://github.com/Fahimul-06/task-management-app.git
   cd task-management-app
   ```

### Install Dependencies
```bash
npm install
```

### Configure Environment Variables
Create a `.env` file in the root directory and add the following:
```
DB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
STRIPE_PUBLISHABLE_KEY=<your-stripe-publishable-key>
PORT=2000
```

### Start the Server
```bash
npx nodemon app.js
```
The server will start at `http://localhost:2000` (or the port specified in `.env`).

---

## API Endpoints

### Authentication
- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`

### Products
- **Get All Products**: `GET /api/products`
- **Create Product** (Admin): `POST /api/products`

### Cart
- **Add to Cart**: `POST /api/cart`
- **Remove from Cart**: `DELETE /api/cart/:productId`

### Orders
- **Place Order**: `POST /api/orders`
- **Get Orders**: `GET /api/orders`

### Feedback
- **Submit Feedback**: `POST /api/feedbacks`
- **View Feedback** (Admin): `GET /api/feedbacks`

---

## Testing the Project

### Demo Users
1. **Create an Admin Account**:
   Use the `/api/admin/register` endpoint to create an admin account.

2. **Test User Actions**:
   Use tools like [Postman]to test customer endpoints.

### Stripe Payment Testing
Use Stripe's test card details to simulate successful payments. 
Refer to the [Stripe documentation](https://stripe.com/docs/testing) for more test card details.

### Invoice Generation
Order invoices will be saved in the `invoices/` directory.

---

## Technologies Used
- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Integration**: Stripe API
- **File Handling**: Invoices stored as PDF files

---

## Future Enhancements
- Implement a frontend for customer interaction.
- Add email notifications for order updates and feedback responses.
- Enhance security for admin operations.
- Add real-time order status updates using WebSockets.

---

## License
This project is open-source and available under the MIT License.
