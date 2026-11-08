const isAdmin = (req,res,next) => {
    if (!req.session.user) {
        return res.redirect('/auth/sign-in')
    }
    if (req.session.user.role !== 'admin') {
        return res.send('Access denied. Admins only')
    }
next() 
}
module.exports = isAdmin