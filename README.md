# MongoDB Express API

A RESTful API built with Express.js and MongoDB.

## Deployment on Vercel

### Prerequisites
1. Install Vercel CLI: `npm i -g vercel`
2. Make sure you have a MongoDB database (MongoDB Atlas recommended)

### Environment Variables
Set these environment variables in your Vercel dashboard:

- `MONGODB_URL`: Your MongoDB connection string
- `saltRounds`: Salt rounds for bcrypt (e.g., "10")
- `Auth_Secret`: Secret key for JWT tokens

### Deployment Steps

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy your application**:
   ```bash
   vercel
   ```

4. **Set environment variables** in Vercel dashboard:
   - Go to your project settings
   - Navigate to Environment Variables
   - Add the required variables mentioned above

### API Endpoints

- `GET /` - Health check
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /user` - User routes
- `GET /task` - Task routes

### Local Development

```bash
npm install
npm run dev
```

The server will run on `http://localhost:4000` 