const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or use Mailgun, SendGrid, etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendVerificationEmail = (email, token) => {
  try {
    const url = `${process.env.BASE_URL}/verify-email/${token}`;

  const mailOptions = {
    from: `"Creative 86" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify your email',
    html: `<h2>Email Verification</h2>
           <p>Click the link to verify your email:</p>
           <a href="${url}">${url}</a>`
  };

  return transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
};

module.exports = sendVerificationEmail;
