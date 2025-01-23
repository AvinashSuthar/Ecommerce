# E-Commerce Platform

An advanced e-commerce platform built with modern web technologies. This application enables users to browse, search, filter, and purchase products with an intuitive interface.

## Tech Stack

- **Frontend:** React, JavaScript
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Containerization:** Docker

## Features

- User authentication (signup, login)
- Product listing, searching, filtering, and sorting
- Add to cart functionality
- Responsive and user-friendly UI
- RESTful APIs for backend services

---

## Setting Up Locally

Follow these steps to set up and run the project locally.

### Prerequisites

- Install [Node.js](https://nodejs.org/)
- Install [Docker](https://www.docker.com/)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
  
   ```

2. Navigate to the `ecom` directory:
   ```bash
   cd <repository-name>
   ```

3. Run the backend server using Docker:
   ```bash
   npm install 
   node index.js
   ```

   The backend server will be available at `http://localhost:3000`.

### Frontend Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   The frontend application will be available at `http://localhost:3000`.

---

## Notes

- Ensure the backend server is running before accessing the frontend.
- You can update the `.env` files in both `backend` and `client` directories for configuration settings.

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

## License

This project is licensed under the MIT License.
