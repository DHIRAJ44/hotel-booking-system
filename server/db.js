// const mongoose = require('mongoose');

// const uri = 'mongodb+srv://jeetmodi1711:Jeet%401234@cluster0.wk9z4ed.mongodb.net/mern-room';

// const connectDB = async () => {
//   try {
//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000,
//     });
//     console.log('MongoDB connected successfully');
//   } catch (err) {
//     console.error('MongoDB connection error:', err);
//   }
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async (uri) => {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected successfully');
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  };
  
  module.exports = connectDB;