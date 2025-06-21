# MERN Buddy - Your Complete Learning Tracker

A comprehensive full-stack MERN application designed to help beginners and intermediate developers master the MERN stack through structured learning, practical code examples, and progress tracking.

## 🚀 Features

### 📚 **Learning Management**
- **User Authentication** - Secure signup/signin with JWT tokens
- **Topics Tracking** - Monitor learning progress with notes, code snippets, and completion status
- **Goals System** - Set learning objectives with deadlines and priorities
- **Progress Analytics** - Visualize learning progress with charts and statistics

### 💻 **Code Examples & Tutorials**
- **20+ Practical Examples** - Hands-on code examples for all MERN technologies
- **Beginner to Advanced** - Examples categorized by difficulty level
- **Copy-Paste Ready** - All code examples are production-ready and well-commented
- **Detailed Explanations** - Each example includes step-by-step explanations and pro tips

### 🎯 **Learning Features**
- **Search & Filter** - Find topics and examples by category, status, or search terms
- **Responsive Design** - Works perfectly on desktop and mobile devices
- **Interactive UI** - Beautiful, modern interface with smooth animations

## 🛠 Tech Stack

### Frontend
- **React.js** - UI library with hooks and functional components
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework for beautiful designs
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Beautiful notifications
- **Lucide React** - Modern icon library

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/mern-buddy.git
cd mern-buddy
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/mern-buddy

# JWT Secret (change this in production)
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# If using local MongoDB
mongod

# Or start MongoDB service
sudo systemctl start mongod
```

### 5. Run the Application
```bash
# Start both frontend and backend concurrently
npm run dev

# Or run them separately:
# Backend only
npm run server

# Frontend only
npm run client
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

## 🏗 Project Structure

```
mern-buddy/
├── server/                 # Backend Express.js application
│   ├── models/            # MongoDB models (User, Topic, Goal)
│   ├── routes/            # API routes (auth, topics, goals)
│   ├── middleware/        # Authentication middleware
│   └── index.js          # Server entry point
├── src/                   # Frontend React application
│   ├── components/        # React components
│   │   ├── auth/         # Authentication components
│   │   ├── common/       # Shared components
│   │   ├── dashboard/    # Dashboard components
│   │   ├── examples/     # Code examples components
│   │   ├── goals/        # Goals management
│   │   └── topics/       # Topics management
│   ├── data/             # Static data and examples
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API service functions
│   └── lib/              # Utility libraries
├── .env                  # Environment variables
└── package.json          # Dependencies and scripts
```

## 💡 Code Examples Included

### MongoDB Examples
- **Database Connection** - Learn to connect to MongoDB
- **CRUD Operations** - Create, Read, Update, Delete operations
- **Aggregation Pipelines** - Advanced data processing

### Express.js Examples
- **Basic Server Setup** - Create HTTP servers with routing
- **Middleware Functions** - Custom authentication and logging
- **RESTful APIs** - Complete API with error handling

### React.js Examples
- **Functional Components** - useState and component basics
- **useEffect Hook** - Side effects and lifecycle management
- **Custom Hooks** - Reusable logic and data fetching

### Node.js Examples
- **File System Operations** - Reading and writing files
- **HTTP Client/Server** - Making requests and handling responses
- **Streams & Events** - Advanced Node.js patterns

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Topics
- `GET /api/topics` - Get all user topics
- `POST /api/topics` - Create new topic
- `PUT /api/topics/:id` - Update topic
- `DELETE /api/topics/:id` - Delete topic
- `GET /api/topics/category/:category` - Get topics by category

### Goals
- `GET /api/goals` - Get all user goals
- `POST /api/goals` - Create new goal
- `PUT /api/goals/:id` - Update goal
- `DELETE /api/goals/:id` - Delete goal
- `GET /api/goals/upcoming` - Get upcoming goals

## 🎯 Usage Guide

### For Beginners
1. **Sign Up** - Create your account to start tracking progress
2. **Explore Code Examples** - Browse 20+ practical examples with explanations
3. **Add Your First Topic** - Start tracking what you're learning
4. **Set Learning Goals** - Define what you want to achieve and by when
5. **Track Progress** - Update your progress as you learn

### For Educators
- Use the code examples as teaching materials
- Students can track their progress through your curriculum
- Examples include pro tips and best practices
- All code is copy-paste ready for hands-on learning

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes with middleware
- Input validation and sanitization
- CORS configuration for secure cross-origin requests

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables in your hosting platform
2. Ensure MongoDB connection string is configured
3. Deploy the application

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Configure API base URL for production

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Add More Code Examples** - Submit examples for advanced topics
2. **Improve Documentation** - Help make instructions clearer
3. **Bug Fixes** - Report and fix issues
4. **Feature Requests** - Suggest new learning features

### Development Process
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📚 Learning Resources

### Recommended Learning Path
1. **Start with Node.js basics** - Understand JavaScript runtime
2. **Learn Express.js** - Build your first API
3. **Master MongoDB** - Database operations and modeling
4. **Dive into React** - Component-based UI development
5. **Build Full-Stack Apps** - Combine all technologies

### Additional Resources
- [MongoDB University](https://university.mongodb.com/) - Free MongoDB courses
- [React Documentation](https://react.dev/) - Official React docs
- [Express.js Guide](https://expressjs.com/) - Express.js documentation
- [Node.js Documentation](https://nodejs.org/docs/) - Official Node.js docs

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built as a comprehensive learning platform for MERN stack development
- Icons provided by Lucide React
- UI components styled with Tailwind CSS
- Inspired by the need for structured, beginner-friendly MERN learning

## 📞 Support

If you have questions or need help:
- Open an issue on GitHub
- Check the code examples for practical guidance
- Review the API documentation above

---

**Happy Learning! 🚀** Start your MERN stack journey today with practical examples and structured progress tracking.