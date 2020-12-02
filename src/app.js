const path = require('path');
const express = require('express');
const expressHbs = require('express-handlebars');

const viewsPath = path.join(process.cwd(), 'views');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(viewsPath));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', viewsPath);

const { mainRouter, authRouter, userRouter, errorRouter } = require('./routes');

app.use('/', mainRouter);

app.use('/auth', authRouter);

app.use('/users', userRouter);

app.use('/error', errorRouter);

app.listen(5000, () => {
        console.log(5000);
});
