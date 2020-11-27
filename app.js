const fs = require('fs')
const path = require('path')
const express = require('express')
const expressHbs = require('express-handlebars');
const app = express();
const viewsPath = path.join(process.cwd(), 'views')
const jsonUsersPath = path.join(process.cwd(), './users.json')

let isLogged = false;
let currentUserName = ''
let errorMsg = ''

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(viewsPath))

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));
app.set('views', viewsPath)


app.get('/', ((req, res) => {
    res.render('main', {isLogged})
}))


app.get('/users', (req, res) => {
    fs.readFile(jsonUsersPath, ((err, data) => {
        const users = JSON.parse(data.toString());

        isLogged ? (res.render('users', {users, currentUserName})) : (res.render('errPage'))
    }))
})


app.get('/login', ((req, res) => {
    res.render('login')
}))

app.post('/login', (req, res) => {
    const {email, password} = req.body;

    fs.readFile(jsonUsersPath, ((err, data) => {
        const users = JSON.parse(data.toString());
        const isUserExist = users.find(el => el.email === email && el.password === password);

        if (!isUserExist) {
            errorMsg = 'Wrong password or email'
            res.redirect('/error')
            return
        }

        currentUserName = isUserExist.name
        isLogged = true
        res.redirect('/users')
    }))
})


app.post('/logout', ((req, res) => {
    isLogged = false;
    res.redirect('/login')
}))


app.get('/auth', ((req, res) => {
    isLogged = false
    res.render('auth')
}))

app.post('/auth', ((req, res) => {
    const {email} = req.body

    fs.readFile(jsonUsersPath, ((err, data) => {

        const users = JSON.parse(data.toString());
        const isEmailExist = users.find(el => el.email === email);

        if (isEmailExist) {
            errorMsg = 'User with current email already exist'
            res.redirect('/error')
            return
        }

        users.push(req.body)
        res.redirect('/login')
        fs.writeFile(jsonUsersPath, JSON.stringify(users), err => err && null)

    }))
}))


app.get('/error', ((req, res) => {
    res.render('errPage', {errorMsg})
}))

app.listen(5000, () => {
    console.log('app listen 5000')
})



