const nodemailer = require("nodemailer");

const { PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'ryan.test245@gmail.com',
           pass: PASSWORD
       }
   });

const mailOptions = {
  from: "ryan.test245@gmail.com",
  to: "ryanmilne101@gamil.com",
  subject: "Nice Nodemailer test",
  text: "Hey there, it’s our first message sent with Nodemailer ;) ",
  html: "<b>Hey there! </b><br> This is our first message sent with Nodemailer",
};
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log("Email sent successfully!");
});
