import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: "Not Authorized Login Again" });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export const adminMiddleware = async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return next(new ErrorHandler("Not authorized as admin", 401));
    }
};
