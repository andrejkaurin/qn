/**
 * GET /
 * Expert page.
 */
exports.signup = function (req, res) {
    res.render('expert/signup', {
        title: 'Sign as expert'
    });
};