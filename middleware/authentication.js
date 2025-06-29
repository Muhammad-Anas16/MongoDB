import ResFunc from '../ResFunc/ResFunc.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

let authentication = (req, res, next) => {
    console.log("Authentication middleware running...");
    const bearerToken = req?.headers?.authorization;
    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {

        ResFunc(res, 403, true, null, "Token Not Found");
    }

    const token = bearerToken.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.Auth_Secret)
        console.log("User verified:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("JWT verification error:", error);
        ResFunc(res, 500, true, null, "Invalid Token!")
    }
}

export default authentication;