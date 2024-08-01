require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { swaggerUi, swaggerSpec } = require('./swagger');
const cors = require('cors');

const db = require('./models/db');
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const gradeRoutes = require('./routes/gradeRoutes');

const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200,
}

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

db.sequelize.sync({ alter: true }).then(() => {
  console.log("Database was re synced");
}).catch((err) => {
  console.error('Error syncing database:', err);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/user', userRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/subject', subjectRoutes);
app.use('/api/grade', gradeRoutes);

app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Server connected to port ${port}`);
});
