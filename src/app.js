const express = require('express');

const app = express();

const db = require('./database').getInstance();

db.setModels();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { userRouter } = require('./routes');

app.use('/users', userRouter);

app.listen(5000, () => {
        console.log(5000);
});
