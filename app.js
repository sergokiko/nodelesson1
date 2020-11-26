let users = [
    {name: 'Sergiy', email: 'sergokkio@gmail.com', password: 'ababagalamaga'},
    {name: 'Olena', email: 'olenaromaonva@mail.ru', password: '12345678'},
    {name: 'Ser', email: 'ser@mail.com', password: '1234'},
]


const fs = require('fs')
const path = require('path')
const express = require('express')
const expressHbs = require('express-handlebars')

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const viewsPath = path.join(process.cwd(), 'views')

app.use(express.static(viewsPath))

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));
app.set('views', viewsPath)


let isLogged = false;
let currentUserName = ''


app.get('/', ((req, res) => {
    res.render('main', {isLogged})
}))

app.get('/users', ((req, res) => {

    isLogged ? (res.render('users', {users, currentUserName})) : (res.render('errPage'))

}))


app.get('/login', ((req, res) => {
    res.render('login')
}))

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    const isUserExist = users.find(el => el.email === email && el.password === password);
    if (!isUserExist) {
        res.redirect('/error')
        return
    }

    currentUserName = isUserExist.name
    isLogged = true
    res.redirect('/users')
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
     const isEmailExist = !!users.find(el => el.email === email);
    if(isEmailExist){
        res.redirect('/error')
        return
    }
    users.push(req.body)
    res.redirect('/login')
}))



app.get('/error', ((req, res) => {
    res.render('errPage')
}))

app.listen(5000, () => {
    console.log('app listen 5000')
})
