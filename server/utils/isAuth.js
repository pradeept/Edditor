// isAuthenticated() is a function automatically added to the request by passport. It returns boolean. 
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(401).json({ msg: "Unauthorized" })
    }
}

export { isAuthenticated }