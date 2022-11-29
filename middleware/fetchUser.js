const jwt = require('jsonwebtoken')

const fetchUser = (req, res, next) => {
    // GET the user from the jwt token and add the id to req object

    const token = req.header('auth-token')
    if(!token) {
        return res.status(401).send({error: "fetch block - Please authenticate with a valid token"})
    }

    // Verify the token, ideally the token secret must be a separate enviroment variable.
    
    try {
        const data = jwt.verify(token, process.env.SECRET)
        req.user = data.user
        next()
    } catch(err) {
        console.log(err.message)
        res.status(401).send({error: "catch block - Please authenticate with a valid token"})
    }
}

module.exports = fetchUser