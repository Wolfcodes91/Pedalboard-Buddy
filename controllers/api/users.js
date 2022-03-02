const jwt = require('jsonwebtoken')
const User = require('../../models/user');

module.exports = {
    create,
}

async function create(req, res) {
    try {
        // Add the user to the db
        const user = await User.create(req.body);
        // token will be a string
        const token = createJWT(user);
        // yes we can serialize a string
        res.json(token);
    } catch (err) {
        // probably a duplicate email
        res.status(400).json(err);
    }
}

// helper function

function createJWT(user) {
    return jwt.sign(
        // data payload 
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}