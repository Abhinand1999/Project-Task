const mongoose = require('mongoose');

// Load environment variables from .env
require('dotenv').config();

beforeAll(async () => {
    const dbUrl = process.env.MONGO_URL;  // Ensure you're getting the correct DB_URL
  await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
