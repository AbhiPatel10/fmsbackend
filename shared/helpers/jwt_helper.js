const JWT = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = {
    verifyAccessToken : (req, res, next) =>{
        if(!req.headers['authorization']) return next(createError.Unauthorized())
        const authheader = req.headers['authorization']
        JWT.verify(authheader, process)
    }
}