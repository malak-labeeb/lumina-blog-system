const mongoose = require('mongoose');

class DatabaseSingleton {
  constructor() {
    if (!DatabaseSingleton.instance) {
      this._connect();
      DatabaseSingleton.instance = this;
    }
    return DatabaseSingleton.instance;
  }

  _connect() {
    mongoose.connect(process.env.MONGO_URI)
      .then(() => console.log('✅ Connected to MongoDB via Singleton Pattern'))
      .catch(err => console.error('❌ DB Connection Error:', err));
  }
}

module.exports = new DatabaseSingleton();