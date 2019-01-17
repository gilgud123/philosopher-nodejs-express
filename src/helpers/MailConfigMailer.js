const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const email = 'gilgud123@gmail.com';
const password = 'Prutser123';
const {resetPasswordTemplate} = require('mail-templates/Reset');

const Logger = require('helpers/LoggerHelper');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'gilgud123@gmail.com',
        pass: 'Prutser123'
    }
});

const mail = (sendToEmail, subject, html) => {
    const mailOptions = {
        from: '"Philosopher App Authentication" <gilgud123@gmail.com>',
        to: sendToEmail,
        subject: subject,
        html: html
    };

    return transporter.sendMail(mailOptions, (error, info) => {
        error ? console.log(error) : console.log('Email sent: ' + info.response);
    });
};

const resetPasswordMail = (user, token) => {
    const url = 'http://localhost:8081/password/reset/'+token;
    Logger.log('info', `This is the resetPasswordMail helper with the url ${url}`);
    const data = { name: user.name, url: url };
    const handledTemplate = handlebars.compile(resetPasswordTemplate);
    const emailBody = handledTemplate(data);
    const subject = `Reset your password for the Philosopher Quote Express!`;

    return mail(user.email, subject, emailBody);
};

module.exports = { resetPasswordMail };