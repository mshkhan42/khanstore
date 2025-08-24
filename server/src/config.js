import dotenv from 'dotenv';

dotenv.config();

const config = {
  // Server
  port: process.env.PORT || 5000,

  // Database
  mongoURI: process.env.MONGO_URI?.trim() || 'mongodb://127.0.0.1:27017/khanstore',

  // Authentication
  jwtSecret: process.env.JWT_SECRET || 'defaultSecretKey',

  // Environment
  nodeEnv: process.env.NODE_ENV || 'development'
};

export default config;
