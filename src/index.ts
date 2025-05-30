import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './routes/app';

dotenv.config();

const PORT = process.env.PORT || 3000;

const mongoUri = process.env.MONGODB_URI as string;

mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected!');
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });