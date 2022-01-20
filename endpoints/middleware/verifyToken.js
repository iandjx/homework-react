const jwt =require("jsonwebtoken");
const User =require("../user/UserModel.js");

const extractToken = (rawTokenHeader) => {
  
  if(!rawTokenHeader) { return undefined; }

  // Remove bearer and extract token value
  const temp = rawTokenHeader.split(' ');
  if(!temp || temp.length != 2) { return undefined; }

  // Return encoded token
  return temp[1];

};

module.exports = function(req,res,next){
  // Get authorization header
  const rawTokenHeader = req.header('Authorization');

  // Get token value
  const token = extractToken(rawTokenHeader);

  // No token -> No access
  if(!token) {
    console.log('No token in request');
    // Access denied
    return res.status(401).send('Access Denied');
  }
  
  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.token= decoded;
    
    //console.log(token.userID);
        // Proceed
    next();
  } catch(err) {
    console.error('Error in JWT check: ', err);
    // Tell client something went wrong
    res.status(400).send('Invalid Token');
  }
}
