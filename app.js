const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path')
const hbs = require('express-handlebars');
const Handlebars = require('handlebars');
const dotenv = require('dotenv');
const db = require('./models/db');
const authRoutes = require("./routes/authRoutes");
const morgan = require('morgan');

dotenv.config();
const app = express();

//Set view engine
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const handlebars = hbs.create({
  helpers: {
    // Equality check helper
    eq: (a, b) => a === b,

    // Date formatting helper
    formatDate: (date) => {
      const d = new Date(date);
      return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    },

    // Uppercase string helper
    uppercase: (str) => str.toUpperCase(),

    // Conditional check: if a value is greater than another
    gt: (a, b) => a > b,

    // Greater than or equal check
    gte: (a, b) => a >= b,

    // JSON stringifying helper
    json: (context) => JSON.stringify(context),

    // Check if user has claimed a food item
    checkClaimed: async (userId, foodId) => {
      const sql = 'SELECT * FROM claimed_items WHERE user_id = ? AND food_id = ?';
      const [result] = await db.promise().query(sql, [userId, foodId]);
      
      return result.length > 0;
    }
  },
  extname: '.hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
});


app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(session({
  key: 'session_cookie_name',
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(authRoutes);
app.use(cors({
  origin: 'https://plpfinalproject-production.up.railway.app', // Your frontend URL
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(morgan("dev"));


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Your app is finally complete!!!!');
});