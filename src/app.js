const express = require('express');

const { sequelize } = require('./database');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { userRouter } = require('./routes');

app.use('/users', userRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.code)
        .json({
            message: err.message,
            ok: false
        });
});

// { alter: true }
(async () => {
    await sequelize.sync();
    app.listen(5000, (err) => err && console.log(err) || console.log('Listen 5000 ...'));
})();
