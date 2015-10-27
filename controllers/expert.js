var secrets = require('../config/secrets');
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport(smtpTransport(secrets.smtp));

/**
 * GET /expert/signup
 * Expert page.
 */
exports.getSignup = function (req, res) {
    res.render('expert/signup', {
        title: 'Sign as expert'
    });
};




/**
 * POST /expert/signup
 * Send a new expert form via Nodemailer.
 */
exports.postSignup = function(req, res) {
    req.assert('expertise', 'Expertise cannot be blank').notEmpty();
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
    var subject = 'Expert Signup | Qusion.NET';

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
        res.redirect('/expert/signup');
    });
};