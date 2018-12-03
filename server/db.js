const mongoose = require('mongoose');
mongoose.connect(
  `mongodb://localhost/${process.env.DB_NAME}`,
  { useNewUrlParser: true }
);
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;

//User Schema

const user = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  topics: [String],
  location: {
    type: { type: String },
    coordinates: [{ type: Number }]
  }
});

user.index({ location: '2dsphere' });

//Message Schema

const message = new mongoose.Schema({
  sender: mongoose.Schema.Types.ObjectId,
  receiver: mongoose.Schema.Types.ObjectId,
  senderName: String,
  receiverName: String,
  date: Date,
  text: String
});

//Models

const User = mongoose.model('User', user);
const Message = mongoose.model('Message', message);

module.exports = { db, User, Message };
