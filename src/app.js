const express = require('express');

const { sequelize } = require('./database');

const app = express();

app.use(express.urlencoded({ extended: true }));

const { userRouter } = require('./routes');

app.use('/users', userRouter);

// { alter: true }
(async () => {
    await sequelize.sync();
    app.listen(5000, (err) => err && console.log(err) || console.log('Listen 5000 ...'));
})();
