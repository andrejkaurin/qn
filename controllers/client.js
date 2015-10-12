/**
 * GET /
 * Client page.
 */
exports.signup = function (req, res) {
    res.render('client/signup', {
        title: 'Hire an Expert'
    });
};