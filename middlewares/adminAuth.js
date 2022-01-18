module.exports = (req, res, next) => {
    if (!req.session.adminLoggedIn) {
        return res.render('adminLogin', {
            msg: "Please Authenticate yourself"
        });
    }
    next();
}