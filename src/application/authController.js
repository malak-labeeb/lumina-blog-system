const User = require('../domain/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    
    const salt = await bcrypt.genSalt(10);
    const pepperedPassword = password + process.env.PEPPER_KEY;
    const hashedPassword = await bcrypt.hash(pepperedPassword, salt);

    const user = new User({
      username,
      password: hashedPassword,
      salt: salt,
      role: role || 'user'
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const pepperedPassword = password + process.env.PEPPER_KEY;
    const isMatch = await bcrypt.compare(pepperedPassword, user.password);

    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};