import nodemailer from "nodemailer";

export default function mailer(receiver, subject, message) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "contact@igc.tn",
      pass: "mdp"
    }
  });

  let mailOptions = {
    from: "contact@igc.tn",
    to: receiver,
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, error => {
    return error;
  });
}
