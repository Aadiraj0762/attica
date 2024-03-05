require("dotenv").config();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const nodemailer = require('nodemailer');

const signInToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      image: user.image,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );
};

const tokenForVerify = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    },
    process.env.JWT_SECRET_FOR_VERIFY,
    { expiresIn: "15m" }
  );
};

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  // console.log('authorization',authorization)
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({
      message: err.message,
    });
  }
};

const isAdmin = async (req, res, next) => {
  const admin = await Admin.findOne({ role: "Admin" });
  if (admin) {
    next();
  } else {
    res.status(401).send({
      message: "User is not Admin",
    });
  }
};
const sendEmail = async (body, res, message) => {
  if (!body.email) {
    return res.status(400).send({ message: 'Email address is required' });
  }

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // or 'STARTTLS'
    auth: {
      user: 'narayaneaadiraj@gmail.com',
      pass: 'lbypcobzplgepjtu'
    }
  });

  let mailOptions = {
    from: 'narayaneaadiraj@gmail.com', // sender email address
    to: body.email, // recipient email address
    subject: 'Password Reset', // subject of the email
    text: message // body of the email
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.send({ message: 'Email sent successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error sending email' });
  }
};

module.exports = {
  signInToken,
  tokenForVerify,
  isAuth,
  isAdmin,
  sendEmail,
};
