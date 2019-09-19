const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: '731e3c87b6a9178815e0efd708bca94f-2b0eef4c-ad973982', // TODO: Replace with your mailgun API KEY
        domain: 'sandboxb8bae15a3f534bf0824858c330e6f74b.mailgun.org' // TODO: Replace with your mailgun DOMAIN
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));


const sendMail = (email, subject, text, cb) => {
    const mailOptions = {
        from: 'nitishv509@gmail.com', // TODO replace this with your own email
        to: email , subject , text
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            return cb(err, null);
        }
        return cb(null, data);
    });
}

module.exports = sendMail;