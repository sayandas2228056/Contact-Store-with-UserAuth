const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    switch (statusCode) {
        case 400:
            res.json({title:"Bad Request",message:err.message, stack: process.env.NODE_ENV === 'production' ? null : err.stack});  
            break;
        case 404:
            res.json({title:"Not Found",message:err.message, stack: process.env.NODE_ENV === 'production' ? null : err.stack});  
            break;
        case 500:
            res.json({title:"Internal Server Error",message:err.message, stack: process.env.NODE_ENV === 'production' ? null : err.stack});  
            break;
        default:
            console.log("No Error, All Good");
            break;
    }
 };

 module.exports = errorHandler;