const User = require('../model/user');


const edit =async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email, password } = req.body;
  
      // Kiểm tra xem người dùng có tồn tại không
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Cập nhật thông tin người dùng
      user.username = username;
      user.email = email;
      user.password = password;
      await user.save();
  
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  module.exports ={edit};