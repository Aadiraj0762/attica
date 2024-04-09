require("dotenv").config();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const nodemailer = require('nodemailer');

const generateToken = (user, secret, expiresIn) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,  // Add specific role for differentiation
      // Include other relevant user data based on the role
    },
    secret,
    { expiresIn }
  );
};

const generateExecutiveToken = (user) => {
  return generateToken(user, process.env.JWT_SECRET_EXECUTIVE, "2d");
};

const signInToken = (user) => {
  if (user.role === "Admin") {
    return generateToken(user, process.env.JWT_SECRET_EXECUTIVE, "2d");
  } else {
    return generateToken(user, process.env.JWT_SECRET_ADMIN, "2d");
  }
};

const tokenForVerify = (user) => {
  if (user.role === "Executive") {
    return generateToken(user, process.env.JWT_SECRET_EXECUTIVE, "15m");
  } else {
    return generateToken(user, process.env.JWT_SECRET_ADMIN, "15m");
  }
};

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ message: "Unauthorized" });
  }
};

const isAdmin = async (req, res, next) => {
  const admin = await Admin.findOne({ role: "Admin" });
  if (admin) {
    next();
  } else {
    res.status(401).send({ message: "User is not Admin" });
  }
};

const sendEmail = async (body, res, message) => {
  if (!body.email) {
    return res.status(400).send({ message: 'Email address is required' });
  }

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // or true for secure connection
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  let mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: body.email,
    subject: 'Password Reset',
    text: message
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
  generateExecutiveToken, // Include the generatedExecutiveToken function in the module exports
};
