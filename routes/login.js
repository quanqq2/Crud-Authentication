const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Tìm kiếm user theo username
      const user = await User.findOne({ email });
      if (!req.body.email) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // So sánh mật khẩu
      const passwordMatched = await bcrypt.compare(password, user.password);
      if (!passwordMatched) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      // Tạo JWT token
      const token = jwt.sign({ user: user._id }, process.env.SECRET_KEY);
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  module.exports ={login}