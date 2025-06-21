export interface CodeExample {
  id: string;
  title: string;
  description: string;
  category: 'mongodb' | 'express' | 'react' | 'nodejs';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  code: string;
  explanation: string;
  output?: string;
  tips: string[];
}

export const codeExamples: CodeExample[] = [
  // MongoDB Examples
  {
    id: 'mongodb-1',
    title: 'Connect to MongoDB',
    description: 'Learn how to establish a connection to MongoDB database',
    category: 'mongodb',
    difficulty: 'beginner',
    code: `const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myproject';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  const collection = db.collection('documents');

  // Close the connection
  await client.close();
}

main().catch(console.error);`,
    explanation: 'This example shows how to connect to a MongoDB database using the official MongoDB Node.js driver. We create a MongoClient instance, connect to the database, and properly close the connection when done.',
    output: 'Connected successfully to server',
    tips: [
      'Always close your database connections to prevent memory leaks',
      'Use environment variables for connection strings in production',
      'Handle connection errors with try-catch blocks',
      'Consider using connection pooling for better performance'
    ]
  },
  {
    id: 'mongodb-2',
    title: 'CRUD Operations',
    description: 'Basic Create, Read, Update, Delete operations in MongoDB',
    category: 'mongodb',
    difficulty: 'intermediate',
    code: `const { MongoClient } = require('mongodb');

async function crudOperations() {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  
  const db = client.db('myapp');
  const users = db.collection('users');

  // CREATE - Insert a document
  const insertResult = await users.insertOne({
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
  });
  console.log('Inserted document:', insertResult.insertedId);

  // READ - Find documents
  const findResult = await users.findOne({ name: 'John Doe' });
  console.log('Found document:', findResult);

  // UPDATE - Update a document
  const updateResult = await users.updateOne(
    { name: 'John Doe' },
    { $set: { age: 31 } }
  );
  console.log('Updated documents:', updateResult.modifiedCount);

  // DELETE - Delete a document
  const deleteResult = await users.deleteOne({ name: 'John Doe' });
  console.log('Deleted documents:', deleteResult.deletedCount);

  await client.close();
}

crudOperations().catch(console.error);`,
    explanation: 'This example demonstrates the four basic database operations: Create (insertOne), Read (findOne), Update (updateOne), and Delete (deleteOne). These are the foundation of most database interactions.',
    output: `Inserted document: ObjectId('...')
Found document: { _id: ObjectId('...'), name: 'John Doe', email: 'john@example.com', age: 30 }
Updated documents: 1
Deleted documents: 1`,
    tips: [
      'Use insertMany() for bulk inserts to improve performance',
      'Learn MongoDB query operators like $gt, $lt, $in for complex queries',
      'Use indexes on frequently queried fields',
      'Always validate data before inserting into the database'
    ]
  },
  {
    id: 'mongodb-3',
    title: 'Aggregation Pipeline',
    description: 'Advanced data processing with MongoDB aggregation',
    category: 'mongodb',
    difficulty: 'advanced',
    code: `const { MongoClient } = require('mongodb');

async function aggregationExample() {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  
  const db = client.db('ecommerce');
  const orders = db.collection('orders');

  // Sample data structure:
  // { customerId: 1, amount: 100, status: 'completed', date: ISODate }

  const pipeline = [
    // Stage 1: Match completed orders
    {
      $match: {
        status: 'completed'
      }
    },
    // Stage 2: Group by customer and calculate totals
    {
      $group: {
        _id: '$customerId',
        totalAmount: { $sum: '$amount' },
        orderCount: { $sum: 1 },
        avgOrderValue: { $avg: '$amount' }
      }
    },
    // Stage 3: Sort by total amount (descending)
    {
      $sort: { totalAmount: -1 }
    },
    // Stage 4: Limit to top 10 customers
    {
      $limit: 10
    }
  ];

  const result = await orders.aggregate(pipeline).toArray();
  console.log('Top customers:', result);

  await client.close();
}

aggregationExample().catch(console.error);`,
    explanation: 'Aggregation pipelines allow you to process data through multiple stages. This example finds the top 10 customers by total order value, demonstrating $match, $group, $sort, and $limit stages.',
    output: `Top customers: [
  { _id: 123, totalAmount: 1500, orderCount: 5, avgOrderValue: 300 },
  { _id: 456, totalAmount: 1200, orderCount: 3, avgOrderValue: 400 },
  ...
]`,
    tips: [
      'Use $match early in the pipeline to reduce data processed in later stages',
      'Aggregation pipelines are more powerful than simple find() queries',
      'Use $lookup for joining collections (like SQL JOINs)',
      'Consider using indexes on fields used in $match and $sort stages'
    ]
  },

  // Express.js Examples
  {
    id: 'express-1',
    title: 'Basic Express Server',
    description: 'Create a simple Express.js server with basic routing',
    category: 'express',
    difficulty: 'beginner',
    code: `const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// Route with parameters
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ 
    message: \`User ID is \${userId}\`,
    user: { id: userId, name: 'John Doe' }
  });
});

// POST route
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({
    message: 'User created successfully',
    user: { id: Date.now(), name, email }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
    explanation: 'This example creates a basic Express.js server with GET and POST routes. It demonstrates route parameters, request body parsing, and sending JSON responses.',
    output: `Server running on port 3000

GET / → {"message": "Hello World!"}
GET /users/123 → {"message": "User ID is 123", "user": {"id": "123", "name": "John Doe"}}
POST /users → {"message": "User created successfully", "user": {...}}`,
    tips: [
      'Use environment variables for configuration like PORT',
      'Always use middleware like express.json() to parse request bodies',
      'Organize routes in separate files for larger applications',
      'Use status codes appropriately (200, 201, 404, 500, etc.)'
    ]
  },
  {
    id: 'express-2',
    title: 'Middleware Functions',
    description: 'Understanding and creating custom middleware in Express',
    category: 'express',
    difficulty: 'intermediate',
    code: `const express = require('express');
const app = express();

// Built-in middleware
app.use(express.json());
app.use(express.static('public'));

// Custom logging middleware
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(\`[\${timestamp}] \${req.method} \${req.url}\`);
  next(); // Important: call next() to continue to the next middleware
};

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  // Simulate token validation
  if (token === 'Bearer valid-token') {
    req.user = { id: 1, name: 'John Doe' };
    next();
  } else {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Apply middleware globally
app.use(logger);

// Public route (no authentication needed)
app.get('/public', (req, res) => {
  res.json({ message: 'This is a public endpoint' });
});

// Protected route (authentication required)
app.get('/protected', authenticate, (req, res) => {
  res.json({ 
    message: 'This is a protected endpoint',
    user: req.user 
  });
});

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
    explanation: 'Middleware functions execute during the request-response cycle. This example shows custom logging and authentication middleware, demonstrating how to control access to routes.',
    output: `[2024-01-15T10:30:00.000Z] GET /public
[2024-01-15T10:30:05.000Z] GET /protected

GET /public → {"message": "This is a public endpoint"}
GET /protected (no token) → 401 {"error": "No token provided"}
GET /protected (valid token) → {"message": "This is a protected endpoint", "user": {...}}`,
    tips: [
      'Always call next() in middleware unless you\'re ending the response',
      'Order matters - middleware executes in the order it\'s defined',
      'Use middleware for cross-cutting concerns like logging, authentication, CORS',
      'Error handling middleware should be defined last and have 4 parameters'
    ]
  },
  {
    id: 'express-3',
    title: 'RESTful API with Error Handling',
    description: 'Building a complete RESTful API with proper error handling',
    category: 'express',
    difficulty: 'advanced',
    code: `const express = require('express');
const app = express();

app.use(express.json());

// In-memory data store (use database in real apps)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// Async wrapper to catch errors
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// Validation middleware
const validateUser = (req, res, next) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return next(new AppError('Name and email are required', 400));
  }
  
  if (!email.includes('@')) {
    return next(new AppError('Please provide a valid email', 400));
  }
  
  next();
};

// Routes
app.get('/api/users', catchAsync(async (req, res) => {
  res.json({
    status: 'success',
    results: users.length,
    data: { users }
  });
}));

app.get('/api/users/:id', catchAsync(async (req, res, next) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  
  res.json({
    status: 'success',
    data: { user }
  });
}));

app.post('/api/users', validateUser, catchAsync(async (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  
  users.push(newUser);
  
  res.status(201).json({
    status: 'success',
    data: { user: newUser }
  });
}));

app.put('/api/users/:id', validateUser, catchAsync(async (req, res, next) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return next(new AppError('User not found', 404));
  }
  
  users[userIndex] = { ...users[userIndex], ...req.body };
  
  res.json({
    status: 'success',
    data: { user: users[userIndex] }
  });
}));

app.delete('/api/users/:id', catchAsync(async (req, res, next) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return next(new AppError('User not found', 404));
  }
  
  users.splice(userIndex, 1);
  
  res.status(204).json({
    status: 'success',
    data: null
  });
}));

// Global error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});

app.listen(3000, () => {
  console.log('RESTful API server running on port 3000');
});`,
    explanation: 'This example demonstrates a complete RESTful API with proper error handling, validation, and consistent response format. It includes custom error classes and async error handling.',
    output: `GET /api/users → {"status": "success", "results": 2, "data": {"users": [...]}}
POST /api/users (invalid) → 400 {"status": "fail", "message": "Name and email are required"}
GET /api/users/999 → 404 {"status": "fail", "message": "User not found"}`,
    tips: [
      'Use consistent response formats across your API',
      'Implement proper HTTP status codes for different scenarios',
      'Create custom error classes for better error handling',
      'Use async/await with proper error catching for cleaner code'
    ]
  },

  // React Examples
  {
    id: 'react-1',
    title: 'Functional Component with useState',
    description: 'Creating a React component with state management using hooks',
    category: 'react',
    difficulty: 'beginner',
    code: `import React, { useState } from 'react';

function Counter() {
  // useState hook to manage state
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Event handlers
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Counter App</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
          style={{ padding: '8px', marginRight: '10px' }}
        />
        {name && <p>Hello, {name}!</p>}
      </div>

      <div style={{ fontSize: '24px', marginBottom: '20px' }}>
        Count: {count}
      </div>

      <div>
        <button onClick={increment} style={{ margin: '5px', padding: '10px' }}>
          +1
        </button>
        <button onClick={decrement} style={{ margin: '5px', padding: '10px' }}>
          -1
        </button>
        <button onClick={reset} style={{ margin: '5px', padding: '10px' }}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;`,
    explanation: 'This example shows a functional React component using the useState hook to manage state. It demonstrates multiple state variables, event handling, and conditional rendering.',
    output: 'Interactive counter with name input field, displaying current count and buttons to increment, decrement, or reset the counter.',
    tips: [
      'useState returns an array with the current state and a setter function',
      'State updates are asynchronous - don\'t rely on immediate state changes',
      'Use functional updates when new state depends on previous state',
      'Keep state as simple as possible - avoid nested objects when possible'
    ]
  },
  {
    id: 'react-2',
    title: 'useEffect Hook for Side Effects',
    description: 'Managing side effects and lifecycle events with useEffect',
    category: 'react',
    difficulty: 'intermediate',
    code: `import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect for fetching user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(\`/api/users/\${userId}\`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]); // Dependency array - effect runs when userId changes

  // Effect for document title
  useEffect(() => {
    if (user) {
      document.title = \`Profile - \${user.name}\`;
    }
    
    // Cleanup function
    return () => {
      document.title = 'My App';
    };
  }, [user]);

  // Effect for window resize listener
  useEffect(() => {
    const handleResize = () => {
      console.log('Window resized:', window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array - runs once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Profile</h2>
      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
        <h3>{user.name}</h3>
        <p>Email: {user.email}</p>
        <p>ID: {user.id}</p>
      </div>
    </div>
  );
}

export default UserProfile;`,
    explanation: 'This example demonstrates useEffect for handling side effects like API calls, document title updates, and event listeners. It shows different dependency patterns and cleanup functions.',
    output: 'User profile component that fetches and displays user data, updates document title, and handles window resize events.',
    tips: [
      'Use dependency arrays to control when effects run',
      'Always clean up subscriptions and event listeners to prevent memory leaks',
      'Separate concerns by using multiple useEffect hooks',
      'Use async functions inside useEffect, not as the effect function itself'
    ]
  },
  {
    id: 'react-3',
    title: 'Custom Hook for Data Fetching',
    description: 'Creating reusable custom hooks for common functionality',
    category: 'react',
    difficulty: 'advanced',
    code: `import { useState, useEffect, useCallback } from 'react';

// Custom hook for data fetching
function useApi(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

// Custom hook for local storage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(\`Error reading localStorage key "\${key}":, error\`);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(\`Error setting localStorage key "\${key}":, error\`);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

// Component using custom hooks
function TodoApp() {
  const { data: todos, loading, error, refetch } = useApi('/api/todos');
  const [filter, setFilter] = useLocalStorage('todoFilter', 'all');

  const filteredTodos = todos?.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  }) || [];

  if (loading) return <div>Loading todos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Todo App</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setFilter('all')}
          style={{ 
            margin: '5px', 
            backgroundColor: filter === 'all' ? '#007bff' : '#f8f9fa',
            color: filter === 'all' ? 'white' : 'black'
          }}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('active')}
          style={{ 
            margin: '5px',
            backgroundColor: filter === 'active' ? '#007bff' : '#f8f9fa',
            color: filter === 'active' ? 'white' : 'black'
          }}
        >
          Active
        </button>
        <button 
          onClick={() => setFilter('completed')}
          style={{ 
            margin: '5px',
            backgroundColor: filter === 'completed' ? '#007bff' : '#f8f9fa',
            color: filter === 'completed' ? 'white' : 'black'
          }}
        >
          Completed
        </button>
        <button onClick={refetch} style={{ margin: '5px' }}>
          Refresh
        </button>
      </div>

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id} style={{ 
            textDecoration: todo.completed ? 'line-through' : 'none',
            margin: '10px 0'
          }}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;`,
    explanation: 'This example shows how to create custom hooks for reusable functionality. The useApi hook handles data fetching with loading and error states, while useLocalStorage manages persistent state.',
    output: 'Todo application with filtering functionality that persists filter preference in localStorage and allows refreshing data.',
    tips: [
      'Custom hooks must start with "use" to follow React conventions',
      'Extract common logic into custom hooks for reusability',
      'Use useCallback to prevent unnecessary re-renders',
      'Custom hooks can use other hooks internally'
    ]
  },

  // Node.js Examples
  {
    id: 'nodejs-1',
    title: 'File System Operations',
    description: 'Reading and writing files using Node.js fs module',
    category: 'nodejs',
    difficulty: 'beginner',
    code: `const fs = require('fs');
const path = require('path');

// Synchronous file operations (blocking)
function syncFileOperations() {
  try {
    // Write file synchronously
    const data = 'Hello, World!\\nThis is a test file.';
    fs.writeFileSync('test.txt', data);
    console.log('File written successfully (sync)');

    // Read file synchronously
    const fileContent = fs.readFileSync('test.txt', 'utf8');
    console.log('File content (sync):', fileContent);

    // Check if file exists
    if (fs.existsSync('test.txt')) {
      console.log('File exists');
    }
  } catch (error) {
    console.error('Sync operation error:', error.message);
  }
}

// Asynchronous file operations (non-blocking) - Callback style
function asyncFileOperations() {
  const data = 'Hello, Async World!\\nThis is an async test file.';
  
  // Write file asynchronously
  fs.writeFile('async-test.txt', data, (err) => {
    if (err) {
      console.error('Write error:', err.message);
      return;
    }
    console.log('File written successfully (async)');

    // Read file asynchronously
    fs.readFile('async-test.txt', 'utf8', (err, content) => {
      if (err) {
        console.error('Read error:', err.message);
        return;
      }
      console.log('File content (async):', content);
    });
  });
}

// Promise-based file operations (modern approach)
async function promiseFileOperations() {
  const fsPromises = fs.promises;
  
  try {
    // Write file using promises
    const data = 'Hello, Promise World!\\nThis is a promise-based test file.';
    await fsPromises.writeFile('promise-test.txt', data);
    console.log('File written successfully (promise)');

    // Read file using promises
    const content = await fsPromises.readFile('promise-test.txt', 'utf8');
    console.log('File content (promise):', content);

    // Get file stats
    const stats = await fsPromises.stat('promise-test.txt');
    console.log('File size:', stats.size, 'bytes');
    console.log('Created:', stats.birthtime);
    console.log('Modified:', stats.mtime);

  } catch (error) {
    console.error('Promise operation error:', error.message);
  }
}

// Working with directories
async function directoryOperations() {
  const fsPromises = fs.promises;
  const dirName = 'test-directory';
  
  try {
    // Create directory
    await fsPromises.mkdir(dirName, { recursive: true });
    console.log('Directory created:', dirName);

    // List directory contents
    const files = await fsPromises.readdir('.');
    console.log('Current directory contents:', files);

    // Remove directory (must be empty)
    await fsPromises.rmdir(dirName);
    console.log('Directory removed:', dirName);

  } catch (error) {
    console.error('Directory operation error:', error.message);
  }
}

// Run examples
console.log('=== Synchronous Operations ===');
syncFileOperations();

console.log('\\n=== Asynchronous Operations ===');
asyncFileOperations();

console.log('\\n=== Promise Operations ===');
promiseFileOperations();

console.log('\\n=== Directory Operations ===');
directoryOperations();`,
    explanation: 'This example demonstrates different ways to work with files in Node.js: synchronous (blocking), asynchronous with callbacks, and modern promise-based approaches. It also shows directory operations.',
    output: `=== Synchronous Operations ===
File written successfully (sync)
File content (sync): Hello, World!
This is a test file.
File exists

=== Asynchronous Operations ===
File written successfully (async)
File content (async): Hello, Async World!
This is an async test file.

=== Promise Operations ===
File written successfully (promise)
File content (promise): Hello, Promise World!
This is a promise-based test file.
File size: 45 bytes
Created: 2024-01-15T10:30:00.000Z
Modified: 2024-01-15T10:30:00.000Z`,
    tips: [
      'Prefer asynchronous operations to avoid blocking the event loop',
      'Use fs.promises or util.promisify for cleaner async/await code',
      'Always handle errors when working with file operations',
      'Use path.join() for cross-platform file path handling'
    ]
  },
  {
    id: 'nodejs-2',
    title: 'HTTP Server and Client',
    description: 'Creating HTTP servers and making HTTP requests in Node.js',
    category: 'nodejs',
    difficulty: 'intermediate',
    code: `const http = require('http');
const https = require('https');
const url = require('url');
const querystring = require('querystring');

// Create a basic HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle different routes
  if (path === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Welcome to Node.js HTTP Server!' }));
    
  } else if (path === '/api/users' && method === 'GET') {
    const users = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ users }));
    
  } else if (path === '/api/users' && method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const userData = JSON.parse(body);
        const newUser = {
          id: Date.now(),
          name: userData.name,
          email: userData.email
        };
        
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ user: newUser }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});

// HTTP Client - Making requests
function makeHttpRequest() {
  // GET request
  const getOptions = {
    hostname: 'jsonplaceholder.typicode.com',
    port: 443,
    path: '/posts/1',
    method: 'GET'
  };

  const getReq = https.request(getOptions, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log('GET Response:', JSON.parse(data));
    });
  });

  getReq.on('error', (error) => {
    console.error('GET Error:', error.message);
  });

  getReq.end();

  // POST request
  const postData = JSON.stringify({
    title: 'My New Post',
    body: 'This is the content of my post',
    userId: 1
  });

  const postOptions = {
    hostname: 'jsonplaceholder.typicode.com',
    port: 443,
    path: '/posts',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const postReq = https.request(postOptions, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log('POST Response:', JSON.parse(data));
    });
  });

  postReq.on('error', (error) => {
    console.error('POST Error:', error.message);
  });

  postReq.write(postData);
  postReq.end();
}

// Make HTTP requests after server starts
setTimeout(() => {
  console.log('\\nMaking HTTP requests...');
  makeHttpRequest();
}, 1000);`,
    explanation: 'This example shows how to create an HTTP server that handles different routes and methods, as well as how to make HTTP requests as a client. It demonstrates request/response handling, JSON parsing, and error handling.',
    output: `Server running on http://localhost:3000

Making HTTP requests...
GET Response: { userId: 1, id: 1, title: "sunt aut facere...", body: "quia et suscipit..." }
POST Response: { title: "My New Post", body: "This is the content...", userId: 1, id: 101 }`,
    tips: [
      'Use frameworks like Express.js for more complex HTTP servers',
      'Always handle errors in HTTP requests and responses',
      'Set appropriate HTTP status codes and headers',
      'Consider using libraries like axios or node-fetch for HTTP client operations'
    ]
  },
  {
    id: 'nodejs-3',
    title: 'Streams and Event Emitters',
    description: 'Working with Node.js streams and event-driven programming',
    category: 'nodejs',
    difficulty: 'advanced',
    code: `const fs = require('fs');
const { EventEmitter } = require('events');
const { Transform, Readable, Writable } = require('stream');

// Custom Event Emitter
class TaskManager extends EventEmitter {
  constructor() {
    super();
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
    this.emit('taskAdded', task);
  }

  completeTask(taskId) {
    const taskIndex = this.tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
      this.tasks[taskIndex].completed = true;
      this.emit('taskCompleted', this.tasks[taskIndex]);
    }
  }

  getAllTasks() {
    return this.tasks;
  }
}

// Using the custom event emitter
const taskManager = new TaskManager();

taskManager.on('taskAdded', (task) => {
  console.log(\`New task added: \${task.title}\`);
});

taskManager.on('taskCompleted', (task) => {
  console.log(\`Task completed: \${task.title}\`);
});

// Add some tasks
taskManager.addTask({ id: 1, title: 'Learn Node.js Streams', completed: false });
taskManager.addTask({ id: 2, title: 'Build REST API', completed: false });
taskManager.completeTask(1);

// Custom Readable Stream
class NumberStream extends Readable {
  constructor(options) {
    super(options);
    this.current = 1;
    this.max = 10;
  }

  _read() {
    if (this.current <= this.max) {
      this.push(\`Number: \${this.current}\\n\`);
      this.current++;
    } else {
      this.push(null); // End the stream
    }
  }
}

// Custom Transform Stream (converts to uppercase)
class UpperCaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    const upperCased = chunk.toString().toUpperCase();
    callback(null, upperCased);
  }
}

// Custom Writable Stream
class LogStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(\`LOG: \${chunk.toString().trim()}\`);
    callback();
  }
}

// Using streams together
console.log('\\n=== Stream Pipeline ===');
const numberStream = new NumberStream();
const upperCaseTransform = new UpperCaseTransform();
const logStream = new LogStream();

// Create a pipeline
numberStream
  .pipe(upperCaseTransform)
  .pipe(logStream);

// File streaming example
function streamFileProcessing() {
  console.log('\\n=== File Streaming ===');
  
  // Create a large file for demonstration
  const writeStream = fs.createWriteStream('large-file.txt');
  
  for (let i = 1; i <= 1000; i++) {
    writeStream.write(\`Line \${i}: This is some sample data for streaming demo\\n\`);
  }
  writeStream.end();

  writeStream.on('finish', () => {
    console.log('Large file created');
    
    // Now read and process the file using streams
    const readStream = fs.createReadStream('large-file.txt', { encoding: 'utf8' });
    
    let lineCount = 0;
    let buffer = '';
    
    readStream.on('data', (chunk) => {
      buffer += chunk;
      const lines = buffer.split('\\n');
      buffer = lines.pop(); // Keep incomplete line in buffer
      
      lineCount += lines.length;
    });
    
    readStream.on('end', () => {
      if (buffer) lineCount++; // Count the last line if exists
      console.log(\`Processed \${lineCount} lines using streams\`);
      
      // Clean up
      fs.unlink('large-file.txt', (err) => {
        if (err) console.error('Error deleting file:', err);
        else console.log('Temporary file deleted');
      });
    });
    
    readStream.on('error', (error) => {
      console.error('Stream error:', error.message);
    });
  });
}

// Advanced stream example with backpressure handling
class DataProcessor extends Transform {
  constructor(options) {
    super(options);
    this.processedCount = 0;
  }

  _transform(chunk, encoding, callback) {
    // Simulate processing time
    setTimeout(() => {
      this.processedCount++;
      const processed = \`Processed item \${this.processedCount}: \${chunk.toString().trim()}\\n\`;
      callback(null, processed);
    }, 10);
  }
}

function demonstrateBackpressure() {
  console.log('\\n=== Backpressure Handling ===');
  
  const dataSource = new Readable({
    read() {
      if (this.current < 100) {
        this.push(\`Data item \${this.current}\\n\`);
        this.current++;
      } else {
        this.push(null);
      }
    }
  });
  dataSource.current = 1;

  const processor = new DataProcessor();
  const output = new Writable({
    write(chunk, encoding, callback) {
      // Simulate slow output
      setTimeout(() => {
        process.stdout.write(\`OUTPUT: \${chunk}\`);
        callback();
      }, 50);
    }
  });

  dataSource.pipe(processor).pipe(output);
  
  output.on('finish', () => {
    console.log('\\nBackpressure demo completed');
  });
}

// Run examples
setTimeout(streamFileProcessing, 1000);
setTimeout(demonstrateBackpressure, 3000);`,
    explanation: 'This example demonstrates Node.js streams and event emitters. It shows custom readable, writable, and transform streams, event-driven programming, and how streams handle backpressure for efficient memory usage.',
    output: `New task added: Learn Node.js Streams
New task added: Build REST API
Task completed: Learn Node.js Streams

=== Stream Pipeline ===
LOG: NUMBER: 1
LOG: NUMBER: 2
LOG: NUMBER: 3
...
LOG: NUMBER: 10

=== File Streaming ===
Large file created
Processed 1000 lines using streams
Temporary file deleted

=== Backpressure Handling ===
OUTPUT: Processed item 1: Data item 1
OUTPUT: Processed item 2: Data item 2
...
Backpressure demo completed`,
    tips: [
      'Use streams for processing large amounts of data efficiently',
      'Event emitters enable loose coupling between components',
      'Streams automatically handle backpressure to prevent memory issues',
      'Always handle stream errors to prevent crashes'
    ]
  }
];