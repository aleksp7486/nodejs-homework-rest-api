const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();

const contactsRouter = require('./routes/contactsRouter');
const userRouter = require('./routes/userRouter');
const avatarRouter = require('./routes/avatarRouter');

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
const { errorHandler } = require('./helpers/apiHelpers');

const { connectMongo } = require('./db/connectMongo');
const PORT = process.env.PORT || 3000;

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use('/api/contacts', contactsRouter);
app.use('/api/user', userRouter);
app.use('/api/user/avatar', avatarRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: api/contacts',
    data: 'Not found',
  });
});
app.use(errorHandler);

const start = async () => {
  try {
    await connectMongo();
    console.log('Database connection successful');
    app.listen(PORT, err => {
      if (err) console.error('Error at server launch:', err);
      console.log(`Server works at port ${PORT}!`);
    });
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`);
  }
};

start();
