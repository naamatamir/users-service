const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');
require('dotenv').config();

const permissionsRouter = require('./routers/permissionsRouter');
const authUsersRouter = require('./routers/authUsersRouter');
const loginRouter = require('./routers/loginRouter');
const registerRouter = require('./routers/registerRouter');

const app = express();
const port = process.env.PORT || 8001;

// connectDB();

app.use(cors());
app.use(express.json());

//routers
app.use('/permissions', permissionsRouter);
app.use('/authUsers', authUsersRouter);
app.use('/authUsers/login', loginRouter);
app.use('/authUsers/register', registerRouter);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`);
  });
});
