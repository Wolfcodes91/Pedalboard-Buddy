const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Check for the token being sent in a header or as a query
    let token = req.get('Authorization') || req.query.token; 
    if (token) {
        // remove the bearer
        token = token.replace('Bearer ', '');
        // Check if token is valid and not expired
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            // decoded is the entire token payload 
            req.user = err ? null : decoded.user;
            // if your app cares...
            req.exp = err ? null : new Date(decoded.exp * 1000);
            return next();
        });
    } else {
      req.user = null;
      return next();  
    }
}