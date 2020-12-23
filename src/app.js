const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');

require('dotenv').config();

const { sequelize } = require('./database');

const app = express();

app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(process.cwd(), 'public')));

const { userRouter, authRouter, carRouter } = require('./routes');

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/cars', carRouter);

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
