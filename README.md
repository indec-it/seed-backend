# Express MongoDB Seed

A minimal seed project for building RESTful APIs with Express.js and MongoDB using Mongoose ORM.

## Features

- Express.js server with ES6 modules
- MongoDB integration with Mongoose ORM
- Layered architecture (Controllers, Services, Models)
- Authentication middleware with external OAuth service
- Request logging middleware
- RESTful API structure with protected and public routes
- Mongoose schema with timestamps
- Swagger API documentation with organized tags
- Jest testing setup with MongoDB Memory Server
- Axios for HTTP requests
- Prettier code formatting
- Hot reload development with --watch flag

## Prerequisites

- Node.js 22+
- MongoDB instance (local or remote)

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:

   ```env
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/express-seed
   PORT=6091
   AUTH_CLIENT_ID=""
   AUTH_ENDPOINT=""
   AUTH=""
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Access the API documentation at: http://localhost:6091/api-docs

## Project Structure

```
├── src/
│   ├── controllers/    # Route controllers (handle HTTP requests/responses)
│   ├── services/       # Business logic layer and external API calls
│   ├── models/         # Mongoose schemas and models
│   ├── routes/         # API routes
│   │   ├── middlewares/ # Route-specific middlewares (auth, etc.)
│   │   └── public-api/  # Public API routes (no authentication)
│   ├── middlewares/    # Global middlewares (logging, etc.)
│   ├── helpers/        # Helper functions (database, testing)
│   └── docs/           # Swagger documentation
├── tests/              # Test files (models, services, controllers, routes)
├── index.js            # Application entry point
└── package.json
```

## Available Scripts

- `npm start` - Start the development server with hot reload
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run format` - Format code with Prettier

## API Endpoints

### Protected Endpoints (require authentication)
All `/api/*` endpoints require an `Authorization` header with a valid bearer token.

- `GET /api/examples` - Get all examples
- `GET /api/examples/:id` - Get example by ID
- `POST /api/examples` - Create a new example
- `PUT /api/examples/:id` - Update an example
- `DELETE /api/examples/:id` - Delete an example

### Public Endpoints (no authentication required)
- `POST /public-api/login` - User authentication
- `POST /public-api/session` - Validate authentication token

### Documentation
- `GET /api-docs` - Swagger UI documentation

## Authentication

The API uses an external OAuth service for authentication. Protected routes require a valid Bearer token in the Authorization header:

```
Authorization: Bearer <your-token>
```

## Request Logging

All requests are logged with the following format:
```
[2025-01-21T15:30:45.123Z] GET /api/examples - Request received
[2025-01-21T15:30:45.156Z] GET /api/examples - 200 (33ms)
```

## Testing

The project includes comprehensive tests for all layers:

- **Model tests** - Test Mongoose schemas and database operations
- **Service tests** - Test business logic
- **Controller tests** - Test HTTP handling with mocked services
- **Route tests** - Integration tests for complete API endpoints

Tests are configured with Jest and MongoDB Memory Server for isolated testing:

```bash
npm test
```

## Architecture

The project follows a layered architecture:

1. **Routes** - Handle HTTP routing and middleware application
2. **Controllers** - Handle HTTP requests/responses and validation
3. **Services** - Contain business logic and external API calls
4. **Models** - Define data structures and database operations

## Dependencies

### Production
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **axios** - HTTP client for external API calls
- **swagger-ui-express** - API documentation

### Development
- **jest** - Testing framework
- **mongodb-memory-server** - In-memory MongoDB for tests
- **prettier** - Code formatting
- **supertest** - HTTP testing

## License

ISC