const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "fallback_secret";

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profilepicture: user.profilepicture, // Ensure field consistency
        role: user.role,
    };

    // Add token expiration
    const token = JWT.sign(payload, secret, { expiresIn: "1h" });
    return token;
}

function validateToken(token) {
    try {
        const payload = JWT.verify(token, secret);
        return payload;
    } catch (err) {
        throw new Error("Invalid or expired token");
    }
}

module.exports = {
    createTokenForUser,
    validateToken,
};
