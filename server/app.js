
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./src/routes/authRoutes');
const habitRoutes = require('./src/routes/habitRoutes')

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/auth', authRoutes);
app.use('/habits', habitRoutes);


app.listen(PORT, () => {
    console.log(`server started: ${PORT}`)
})
