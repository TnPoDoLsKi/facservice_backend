import nodemailer from "nodemailer";

export default function mailer(receiver, subject, message) {
  const transporter = nodemailer.createTransport({
    host: "banshee.mxlogin.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "archive@igc.tn",
      pass: "[5+gdBr{tiNC"
    }
  });

  let mailOptions = {
    from: "archive@igc.tn",
    to: receiver,
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, error => {
    return error;
  });
}
