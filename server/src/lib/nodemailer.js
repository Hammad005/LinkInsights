import nodemailer from "nodemailer";

const sendEmail = async (opt) => {
    const transport = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_MAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });


    const mailOptions = {
        from: process.env.EMAIL_MAIL,
        to: opt.to,
        subject: opt.subject,
        html: opt.html
    }

    try {
        await transport.sendMail(mailOptions);
        console.log(`${opt.subject} - mail sent successfully`);
    } catch (error) {
        console.log('Error sending email:', error);
    }
};

export default sendEmail;