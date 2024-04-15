const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = (req, res, next) => {
    // Authorization header se token retrieve karein
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        // Agar token nahi mila toh unauthorized error
        return res.status(401).json({ error: 'Authorization token missing' });
    }

    // "Bearer" prefix ke saath token aata hai, isliye usko split karke sirf token lein
    const token = authHeader.split(' ')[1];
    
    if (!token) {
        // Agar token invalid hai toh unauthorized error
        return res.status(401).json({ error: 'Invalid authorization token' });
    }

    try {
        // Token verify karna using JWT secret key
        const decodedToken = jwt.verify(token, config.jwt.secret);
        
        // Token sahi hai toh user ID request object par store kar lein
        req.userId = decodedToken.id;
        
        // Next middleware/route handler call karein
        next();
    } catch (error) {
        // Agar token verify nahi hua toh unauthorized error
        return res.status(401).json({ error: 'Invalid authorization token' });
    }
};

module.exports = authMiddleware;
