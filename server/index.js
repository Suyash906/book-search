/**
 * https://github.com/bvaughn/infinite-list-reflow-examples/blob/master/books.json
 * https://medium.com/swlh/server-side-pagination-in-node-js-with-sequelize-orm-and-mysql-73b0190e91fa - MySQL pagination
 * https://github.com/aravindnc/mongoose-paginate-v2 - MongoDB Pagination
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const dbclustername = 'SearchEngine'
const dbusername = `bevyuser`
const dbpassword = `bevypassword`

const mongourl = `mongodb+srv://${dbusername}:${dbpassword}@cluster0-nogpo.mongodb.net/${dbclustername}`

mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true)

const bookRouter = require('./routes/books');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(bodyParser.urlencoded({
     extended: true
}));
app.use(bodyParser.json());

app.use(express.static('./public'));

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use('/', bookRouter);  

module.exports = app;

const PORT = 3002;
app.listen(3002, () => {console.log(`Server running on port ${PORT}`);})