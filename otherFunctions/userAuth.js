module.exports.isLoggedIn = async (req, res, next) => {
    if(req.session.isLoggedIn) {
        next()
    } else {
        res.redirect('/admin/login')
    }
}

module.exports.isLoggedOut = async (req, res, next) => {
    if (req.session.isLoggedIn) {
        res.redirect('/admin/area')
    } else {
        next()
    }
}

module.exports.isDevik = async (req, res, next) => {
    if (req.session.isDevik && req.session.isLoggedIn) {
        next()
    } else {
        res.redirect('/admin/login')
    }
}
