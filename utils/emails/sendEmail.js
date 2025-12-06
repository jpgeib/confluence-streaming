const nodemailer = require("nodemailer");

const sendEmail = (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: subject,
            text: text
        }, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
                console.log("email sent successfully");
            }
        });
    } catch (error) {
        console.log(error, "email not sent");
    };
};

module.exports = sendEmail;