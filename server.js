const express = require('express');
const errorHandler = require('./middleware/errorhandler.js');
const bcrypt = require('bcrypt');

const app = express();
require('dotenv').config();
const connectDB=require("./config/dbConnection.js");
connectDB();
const PORT = process.env.PORT || 3000;
app.use(express.json());
// Parse URL-encoded bodies (e.g., Postman x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

app.use("/api/contacts",require("./routes/contactRoutes.js"));

app.use("/api/users",require("./routes/userRoutes.js"));
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
