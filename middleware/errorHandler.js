// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    // Handle specific error types
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
            error: 'Duplicate entry',
            message: 'Record already exists'
        });
    }
    
    // Default error response
    res.status(err.status || 500).json({
        error: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = errorHandler;
