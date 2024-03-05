const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "dwarkesh.gohel@plutustec.com",
        pass: "dwarkesh@123"
    },
});

const mailsend = async (mail) => {
    let maildata = {
        to: mail.to,
        subject: mail.subject,
        attachments: {
            filename: 'Invoice.pdf',
            path: mail.filepath,
            contentType: 'application/pdf',
        }
    }
    try {
        await transport.sendMail(maildata);
        console.log("Email sent successfully");
      } catch (error) {
        console.error("Error sending email:", error);
      }
}

module.exports = {mailsend}