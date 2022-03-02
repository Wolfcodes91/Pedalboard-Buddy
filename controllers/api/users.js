const jwt = require('jsonwebtoken')
const User = require('../../models/user');
const bcrypt = require('bcrypt')

module.exports = {
    create, 
    login,
    checkToken,
}

function checkToken(req, res) {
    // req.user will always be there for you (LOL)
    console.log('req.user', req.user)
    res.json(req.exp)
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


async function login(req, res) {
    try {
        console.log('hi')
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error();
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw new Error();
        res.json( createJWT(user) );
      } catch {
        res.status(400).json('Bad Credentials');
      }
  }