# Journal Application

## Description

This Journal Application is a full-stack web application that allows users to create, manage, and view personal journal entries. It features a secure authentication system and real-time state management.

## Features

    - User Authentication: Signup, login, and logout functionality using JWT tokens.
    - JWT Token Management: Redis is used for blacklisting tokens upon logout to ensure secure sessions.
    - Journal Entries: Users can add, delete, and view all their journal entries.
    - State Management: Pinia is used for managing the application state on the frontend.
    - Responsive UI: The frontend is built using Vuetify, providing a modern and responsive design.

## Technologies Used

### Backend

- Express.js
- Redis (for JWT token blacklisting)
- JWT for authentication

### Frontend

- Vue.js
- Pinia (for state management)
- Vuetify (UI component library)

### Usage

    1.	Sign Up: Create a new account by providing your details on the signup page.
    2.	Log In: Use your credentials to log in. A JWT token will be generated and stored securely.
    3.	Manage Journal Entries: After logging in, you can add, delete, and view all your journal entries.
    4.	Log Out: Logging out will blacklist your JWT token, preventing any unauthorized access.

## Installation

1. Clone the repository
2. Install backend dependencies
3. Install frontend dependencies
4. Set up Redis server
5. Configure environment variables (database connection, Redis connection, JWT secret)

## Usage

1. Start the backend server
2. Start the frontend development server
3. Access the application at `http://localhost:4000` (or the port specified in your configuration)

## API Endpoints

- POST api/v1/user/signup - Create a new user account
- POST api/v1/user/login - Authenticate a user and receive a JWT
- POST api/v1/user/logout - Logout and blacklist the current JWT
- POST /api/v1/user/home/list - Retrieve all entries for the logged-in user
- POST /api/v1/user/home/add - Create a new journal entry
- DELETE api/v1/user/home/delete - Delete a specific entry

## Contributing

Contributions to improve the application are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch
3. Make your changes and commit them
4. Push to your fork and submit a pull request

## License

[Specify your license here, e.g., MIT, GPL, etc.]

## Support

For support or questions, please [specify contact method or create an issue in the repository].
