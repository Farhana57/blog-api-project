const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // ১. কুকি অথবা হেডার (Authorization) দুই জায়গা থেকেই টোকেন চেক করার ব্যবস্থা
    let token = (req.cookies ? req.cookies.token : null) || 
                (req.headers.authorization ? req.headers.authorization.split(' ')[1] : null);

    if (!token) {
        return res.status(401).json({ 
            status: "fail",
            message: "Access Denied! Please login first. 🔒" 
        });
    }

    try {
        // ২. টোকেন ভেরিফাই করা
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; 
        next(); 
    } catch (err) {
        res.status(400).json({ 
            status: "fail",
            message: "Invalid Token or Session Expired! ❌" 
        });
    }
};

module.exports = authMiddleware;