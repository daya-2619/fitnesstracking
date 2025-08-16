# Fitness Tracker Backend API

A comprehensive backend API for the Fitness Tracker application built with Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication & Authorization** - JWT-based authentication with role-based access control
- **Comprehensive Data Models** - User profiles, exercises, nutrition tracking, sleep monitoring
- **RESTful API Design** - Clean, consistent API endpoints
- **Security Features** - Rate limiting, CORS, helmet security, input validation
- **MongoDB Integration** - Robust database with Mongoose ODM
- **Real-time Updates** - WebSocket support for live data
- **File Upload Support** - Image and document uploads
- **Email Notifications** - Password reset and user notifications

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs, helmet, CORS
- **Validation**: Built-in validation with error handling
- **File Upload**: Multer with Cloudinary integration
- **Email**: Nodemailer
- **Rate Limiting**: express-rate-limit

## 📁 Project Structure

```
backend/
├── config/           # Configuration files
├── controllers/      # Route controllers
├── middleware/       # Custom middleware
├── models/          # Database models
├── routes/          # API routes
├── utils/           # Utility functions
├── .env             # Environment variables
├── package.json     # Dependencies
├── server.js        # Main server file
└── README.md        # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fitnesstracker
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=30d
   
   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-password
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - User logout

### Exercises
- `GET /api/exercises` - Get all exercises with filtering
- `GET /api/exercises/:id` - Get exercise by ID
- `POST /api/exercises` - Create new exercise (Admin)
- `PUT /api/exercises/:id` - Update exercise (Admin)
- `DELETE /api/exercises/:id` - Delete exercise (Admin)
- `POST /api/exercises/:id/reviews` - Add review to exercise

### Nutrition
- `GET /api/nutrition` - Get user's nutrition data
- `POST /api/nutrition` - Log nutrition entry
- `PUT /api/nutrition/:id` - Update nutrition entry
- `DELETE /api/nutrition/:id` - Delete nutrition entry

### Sleep
- `GET /api/sleep` - Get user's sleep data
- `POST /api/sleep` - Log sleep session
- `PUT /api/sleep/:id` - Update sleep session
- `DELETE /api/sleep/:id` - Delete sleep session

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/friends` - Get user's friends
- `POST /api/users/friends` - Add friend

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📝 Data Models

### User Model
- Basic information (name, email, password)
- Fitness profile (height, weight, goals, activity level)
- Social features (friends, achievements)
- Statistics (workouts, streaks, points)

### Exercise Model
- Exercise details (name, category, difficulty)
- Instructions and variations
- User ratings and reviews
- Usage statistics

### Nutrition Model
- Food logging with detailed nutritional information
- Meal planning and tracking
- Macro and micronutrient analysis
- Progress monitoring

### Sleep Model
- Sleep session tracking
- Sleep quality assessment
- Sleep stages and heart rate data
- Environmental factors

## 🛡️ Security Features

- **Password Hashing** - bcryptjs for secure password storage
- **JWT Tokens** - Secure authentication with expiration
- **Rate Limiting** - Prevent abuse and DDoS attacks
- **CORS Protection** - Configured for frontend integration
- **Input Validation** - Comprehensive data validation
- **Helmet Security** - HTTP security headers
- **Environment Variables** - Secure configuration management

## 🔄 API Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data
  },
  "pagination": {
    // Pagination info (if applicable)
  }
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

## 📈 Performance Features

- **Database Indexing** - Optimized queries with proper indexes
- **Pagination** - Efficient data retrieval for large datasets
- **Caching** - Redis integration for frequently accessed data
- **Compression** - Gzip compression for API responses
- **Connection Pooling** - Optimized database connections

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
Ensure all production environment variables are set:
- `NODE_ENV=production`
- `MONGODB_URI` (production database)
- `JWT_SECRET` (strong secret key)
- `CORS_ORIGIN` (frontend domain)

### Docker Deployment
```bash
# Build Docker image
docker build -t fitness-tracker-backend .

# Run container
docker run -p 5000:5000 fitness-tracker-backend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- **Real-time Features** - WebSocket integration for live updates
- **AI Integration** - Machine learning for personalized recommendations
- **Mobile API** - Optimized endpoints for mobile applications
- **Analytics Dashboard** - Advanced reporting and insights
- **Third-party Integrations** - Wearable devices and fitness apps
- **Microservices Architecture** - Scalable service-based architecture

---

**Happy Coding! 🎉**
