require('dotenv').config(); // Load environment variables from .env file

const config = {
    app: {
        port: process.env.PORT || 3000, // Server port, default 3000
    },
    db: {
        name: process.env.DB_NAME, // MySQL database name
        user: process.env.DB_USER, // MySQL username
        password: process.env.DB_PASSWORD, // MySQL password
        host: process.env.DB_HOST, // MySQL host, default localhost
        dialect: 'mysql', // Add the dialect here
        port:process.env.DB_PORT
    },
    jwt: {
        secret: process.env.JWT_SECRET, // JWT secret key from environment variables
    },
    // Other configurations can go here
};

module.exports = config;
