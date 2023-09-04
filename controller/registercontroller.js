const User = require('../model/user');
const bcrypt = require('bcrypt');

const regeiser= async (req, res) => {
    const { username, email, password } = req.body;

    // Kiểm tra trường name, email và password có tồn tại hay không
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }
  
    // Kiểm tra xem email đã tồn tại trong hệ thống hay chưa
    const duplicateUser = await User.findOne({username }).exec();
    if (duplicateUser) return res.status(409).json('Username taken');
  
    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        await User.create({
          username: username,
          email: email,
          password: hashedPwd,
        });
    
        res.status(201).json(`New user named ${username} was created!`);
      } catch (err) {
        res.status(500).json(err.message);
      }
    }
module.exports = {regeiser}