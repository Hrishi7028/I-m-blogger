const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
  // console.log(req.headers.authorization);
    const token = req.headers.authorization.split('Bearer ')[1];
    // jwt.verify(token,);
    try {
        var decoded = jwt.verify(token, process.env.TOKEN_KEY);
        // console.log(decoded);
        next();
      } catch(err) {
        return res.status(401).json({
            errors:[{msg:err.message}]
        })
      }
}