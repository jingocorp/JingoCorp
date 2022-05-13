const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

// Authenticate is a middleware :-
const AdminAuthenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({
            _id: verifyToken._id,
            "tokens.token": token,
        });

        if (!rootUser || rootUser.email != "admin@jingo.com") {
            throw new Error("User does not has the access !!");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        // console.log("I was here already !!");
        // if(rootUser.email == "admin@rentech.com") {
        //     next() ; // --> admin.js
        // }
        next();
    } catch (err) {
        res.status(401).send("Unauthorized : No token provided");
        console.log("--> " + err);
    }
};

module.exports = AdminAuthenticate;
