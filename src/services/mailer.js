import nodemailer from "nodemailer";

export default function mailer(subject, message) {
  const transporter = nodemailer.createTransport({
    host: "",
    port: 465,
    secure: true,
    auth: {
      user: "oppkalash@gmail.com",
      pass: ""
    }
  });

  let mailOptions = {
    from: "oppkalash@gmail.com",
    to: "atoui.louay77@gmail.com",
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, error => {
    return error;
  });
}
