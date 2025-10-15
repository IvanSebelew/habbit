
require('dotenv').config();
const express = 'express';
const morgan = 'morgan';
const cors = 'cors';
const cookieParser = 'cookie-parser';
const authRoutes = './src/routes/authRoutes';
const habitRoutes = './src/routes/habitRoutes';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(json());
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
