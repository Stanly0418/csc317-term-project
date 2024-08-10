const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const handlebars = require("express-handlebars");
const favicon = require('serve-favicon');

// Import route modules
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// Set up Handlebars view engine
app.engine(
  "hbs",
  handlebars({
    layoutsDir: path.join(__dirname, "views/layouts"), // Layouts directory
    partialsDir: path.join(__dirname, "views/partials"), // Partials directory
    extname: ".hbs", // File extension
    defaultLayout: "layout", // Default layout
    helpers: {}, // You can add custom Handlebars helpers here
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Set favicon
app.use(favicon(__dirname + '/public/favicon.ico'));

// Static files directory
app.use("/public", express.static(path.join(__dirname, "public")));

// Set up route middleware
app.use("/", indexRouter);
app.use("/users", usersRouter);

// MySQL database configuration
const mysql = require('mysql2');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

// Database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0418',
  database: 'csc317_term_project'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

// Session store setup
const sessionStore = new MySQLStore({}, connection);

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

// User registration
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
  connection.query(query, [username, password, email], (err, results) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).send('Internal server error');
    } else {
      res.send('User registered successfully');
    }
  });
});

// User login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      res.status(500).send('Internal server error');
    } else if (results.length > 0) {
      req.session.user = results[0];
      res.send('Login successful');
    } else {
      res.send('Invalid credentials');
    }
  });
});

// User logout
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.send('Logged out successfully');
});

// Catch all unhandled requests
app.use((req, res, next) => {
  next(createError(404, `The route ${req.method} : ${req.url} does not exist.`));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = err;
  console.log(err);
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
