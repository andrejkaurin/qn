/**
 * GET /
 * Home page.
 */
exports.index = function (req, res) {
    res.render('home', {
        title: 'Home'
    });
};

/**
 * GET /why
 * Home page.
 */
exports.why = function (req, res) {
    res.render('why', {
        title: 'Why'
    });
};

/**
 * GET /how
 * Home page.
 */
exports.how = function (req, res) {
    res.render('how', {
        title: 'How it works'
    });
};

/**
 * GET /faq
 * Home page.
 */
exports.faq = function (req, res) {
    res.render('faq', {
        title: 'FAQ'
    });
};