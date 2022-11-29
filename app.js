const express = require('express')
const connectDatabase = require('./db')
const env = require('dotenv')
env.config();

const app = express();
app.use(express.json());

connectDatabase()

app.use('/api/user', require('./routers/userRouter'));
app.use('/api/employee', require('./routers/employeeRouter'))

const port = process.env.PORT;
app.listen(port, console.log(`Application started on port ${port}`));