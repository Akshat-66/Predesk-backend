const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(' ')[1]; // extract token after Bearer

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.userId };
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
