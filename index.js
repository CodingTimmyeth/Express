const express = require("express");
const path = require("path");
const exphbs = require('express-handlebars')
const logger = require('./middleware/logger')
const members = require('./Members')

const app = express();

//Init Middleware
// app.use(logger)

// Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members,
}))

// set a static folder
app.use(express.static(path.join(__dirname, "public")));

// Member api routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));