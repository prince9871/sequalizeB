const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

// Middlewares
app.use(express.json());
app.use(cors());

const sequelize = require('./config/database');
const User = require('./models/User');
const Task = require('./models/Task');

sequelize.sync({ force: false })
    .then(() => console.log('Database synced'))
    .catch((err) => console.error('Database sync error:', err));


// Routes
app.get("/", (req, res) => {
    return res.send("working");
  });
app.use('/auth', authRoutes);
app.use('/', authMiddleware, taskRoutes);
app.use('*',(req,res)=>{return res.send('ye sahi ni h')});
// Start the server
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
});
