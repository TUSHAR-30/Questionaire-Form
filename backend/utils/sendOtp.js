const OTP = require('../Models/otp'); // OTP model
const crypto = require('crypto'); // To generate random OTP
const nodemailer = require('nodemailer'); // Email sending library


// Utility function to send OTP
async function sendOtp(email) {
  try {
    // Generate random OTP (6 digits)
    const otp = crypto.randomInt(100000, 999999).toString();

    // Set OTP expiry time (e.g., 10 minutes)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    // Save OTP in the database
    await OTP.create({ email, otp, expiresAt });

    // Send OTP to user's email
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Registration',
      text: `Your OTP is ${otp}. It will expire in 10 minutes.Verify your account now.`,
    };

    await transporter.sendMail(mailOptions);
    return { message: 'OTP sent successfully' };
  } catch (err) {
    console.error('Error in OTP generation or sending:', err);
    throw new Error('Failed to send OTP');
  }
}

module.exports = sendOtp;
