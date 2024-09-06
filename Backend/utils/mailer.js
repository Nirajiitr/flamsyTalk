import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendVerificationEmail = (user, token) => {
  const url = `https://flamsytalk-vdckqix0.b4a.run/auth/verify/${token}`;

  transporter.sendMail({
    to: user.Username,
    subject: "Email Verification",
    html: `Please click the link to verify your email: <a href="${url}">${url}</a>`,
  });
};
