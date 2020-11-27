const fs = require('fs')
const path = require('path')
const express = require('express')
const expressHbs = require('express-handlebars');

const viewsPath = path.join(process.cwd(), 'views')
const jsonUsersPath = path.join(process.cwd(), './users.json')

const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(viewsPath))

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));
app.set('views', viewsPath)

app.listen(5000, () => {
    console.log('app listen 5000')
})



let isLogged = false;
let currentUserName = ''
let errorMsg = ''

//main page

app.get('/', ((req, res) => {
    res.render('main', {isLogged})
}))


//log in/ log out

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

//auth

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


//users page

app.get('/users', (req, res) => {
    fs.readFile(jsonUsersPath, ((err, data) => {
        const users = JSON.parse(data.toString());

        if (!isLogged) {
            errorMsg = 'You are not logged in'
            res.redirect('/error')
            return
        }
        res.render('users', {users, currentUserName})
    }))
})


//error page
app.get('/error', ((req, res) => {
    res.render('err-page', {errorMsg})
}))



