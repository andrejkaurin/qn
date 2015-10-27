var secrets = require('../config/secrets');
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport(smtpTransport(secrets.smtp));

/**
 * GET /client/signup
 * Client page.
 */
exports.getSignup = function (req, res) {
    res.render('client/signup', {
        title: 'Hire an Expert'
    });
};



/**
 * POST /client/signup
 * Send a contact form via Nodemailer.
 */
exports.postSignup = function(req, res) {
    req.assert('expert', 'Expert you are searching for is required').notEmpty();
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('your_name', 'Your Name cannot be blank').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/client/signup');
    }

    var from = 'noreply@qusion.net';//req.body.email;
    var name = req.body.name;
    var body = JSON.stringify(req.body);
    var to = 'andrej.kaurin@gmail.com';
    var subject = 'Client Signup | Qusion.NET';

    var mailOptions = {
        to: to,
        from: from,
        subject: subject,
        text: body
    };

    transporter.sendMail(mailOptions, function(err) {
        if (err) {
            req.flash('errors', { msg: err.message });
            return res.redirect('/client/signup');
        }
        req.flash('success', { msg: 'Thanks. We have received your data. Expect to be contacted by our team very soon!' });
        res.redirect('/client/signup');
    });
};