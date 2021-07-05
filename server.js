const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
const fileupload = require('express-fileupload');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xssSanitize = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const erroHandler = require('./middleware/error');
const path = require("path");


// Load env variables
dotenv.config({ path: './config/config.env' });

// Connect to DB
connectDB();

// Route files
const bootcamps = require('./routes/bootcamps');
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");


const app = express();

// Body Parser
app.use(express.json());

// Cookie parsing
app.use(cookieParser());

// Middlewares
if (process.env.NODE_ENV === 'development') {
    app.use(logger);
}

// File uploading
app.use(fileupload());


// Sanitize data(prevent NoSQL injections)
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xssSanitize());

// Prevent Http Paramater pollution
app.use(hpp());

// Rate Limiting
const limited = rateLimit({
    windowMs: 10 * 60 * 1000, //10 min
    max: 100
});
app.use(limited);

// Enable CORS(Cross-Origin Resource Sharing)
app.use(cors());



// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use("/api/v1/users", users);


app.use(erroHandler);


const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode
    on port ${PORT}`)
);

//  Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error : ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});