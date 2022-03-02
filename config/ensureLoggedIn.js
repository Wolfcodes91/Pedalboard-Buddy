module.exports = function(req, res, next) {
    // Send back status code 401 - "Unauthorized"
    // ...if not logged in
    if(!req.user) return res.status(401).json('Unauthorized')
    // Everything is cool
    next();
}