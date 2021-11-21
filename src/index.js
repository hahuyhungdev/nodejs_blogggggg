const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const route = require('./routes');
//const db = require('./config/db');
//dsajdsahjh
// Connect to DB
//db.connect();

// const URL = 'mongodb+srv://huyhung:hung@cluster0.s4zxa.mongodb.net/f8_education_dev?retryWrites=true&w=majority'
const URL = 'mongodb://mongo:8kO3TS1n4LEaoB4TlZfI@containers-us-west-11.railway.app:5624'

const connectDB = async () => {
  try {
    await mongoose.connect(
      URL,
      { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      }
    )

    console.log('Connected to mongoDB')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

connectDB()

const app = express();
const port = process.env.PORT || 3000;

// Use static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
//dsadk
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
