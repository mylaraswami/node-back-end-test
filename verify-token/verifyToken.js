var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

function verifyToken(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) 
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  // verifies secret and checks exp
  jwt.verify(token, 'encrypt', function(err, decoded) {      
    if (err) 
      return res.status(500).send({ auth: false, message: 'Failed to authenticate user.' });    

    // if everything is good, save to request for use in other routes
    req.uuid = decoded;
    next();
  });

}

module.exports = verifyToken;