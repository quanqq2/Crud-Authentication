const express = require('express');
const User = require('./model/user');
const mongoose =require('mongoose');
const {add} = require('./routes/adduser');
const {edit} = require('./routes/edit');
const {login} = require('./routes/login');
const {createpost} = require('./routes/postdb');
const app = express();
require('dotenv').config();
const session = require('express-session');
// ...
app.use(session({
  secret: process.env.DB_KEY,
  resave: false,
  saveUninitialized: true
}));
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
const PORT = process.env.PORT || 4000;
// Đăng ký middleware để xử lý dữ liệu POST
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// API endpoint để tạo người dùng
app.post('/users', add);

//edit người dùng
app.put('/edit/:id', edit);

app.use('/register',require('./routes/register'));
app.post('/login', login);
app.use('/post', require('./routes/postdb'));
app.use('/secret', require('./routes/secret'));
app.use('/auth', require('./routes/logingg'));
app.use('/auth1',require('./routes/loginfb'));
app.listen(3000, () => {
  console.log(`Server started http://localhost:${PORT}`);
});
