const {createTokenForUser,validateToken} = require("../services/authentication")

function checkforauthenticationcookie(cookiename) {
    return (req, res, next) => {
        const tokencookievalue = req.cookies[cookiename];
        
        if (!tokencookievalue) {
            // No token, continue with the request processing
            return next();
        }

        try {
            // Validate the token and attach user data to the request
            const userPayload = validateToken(tokencookievalue);
            req.user = userPayload;  // Attach the user info to req.user
            return next();  // Continue to the next middleware/route handler
        } catch (error) {
            // Token is invalid or expired, clear the cookie and proceed
            res.clearCookie(cookiename);
            
            // Optionally, you can redirect to a login page or show a message
            return res.redirect("/user/signin"); // Redirect to the login page
        }
    };
}

module.exports = {
    checkforauthenticationcookie,
};
