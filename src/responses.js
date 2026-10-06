const fs = require('fs');

// Load static files
const index = fs.readFileSync(`${__dirname}/../hosted/client.html`);
const css = fs.readFileSync(`${__dirname}/../hosted/style.css`);
const script = fs.readFileSync(`${__dirname}/../hosted/bundle.js`);


// User "database" json
const database = {
    users: {

    }
}


// General purpose (o7) function to serve content
const serve = (req, res, status, type, content) => {
    res.writeHead(status, { 'Content-Type': type });
    if (req.method !== 'HEAD') {
        res.write(content);
    }
    res.end();
}

//===================================
//          GET/HEAD routes
//===================================


// Route for '/'
// Serves home page html
const getIndex = (req, res) => {
    serve(req, res, 200, 'text/html', index);
}


// Route for '/style.css
// Serves home page css
const getCSS = (req, res) => {
    serve(req, res, 200, 'text/css', css);
}


// Route for '/bundle.js'
// Serves home page js script
const getScript = (req, res) => {
    serve(req, res, 200, 'text/javascript', script);
}


// Route for '/getUsers'
// Serves user data as json
const getUsers = (req, res) => {
    serve(req, res, 200, 'application/json', JSON.stringify({ message: database }));
}


// Route for '/getUsers'
// Serves user data as json
const getNotFound = (req, res) => {
    serve(req, res, 404, 'application/json', JSON.stringify({
        message: "The page you are looking for was not found",
        id: "notFound"
    }));
}



//==============================
//         POST routes
//==============================


// Route for '/addUser'
// Serves user data as json
const postAddUser = (req, res) => {
    if (!req.query.name || !req.query.age) {
        return serve(req, res, 400, 'application/json', JSON.stringify({
            message: "Name and Age parameters are both required",
            id: "missingParams"
        }));
    }
    if (database.users[req.query.name]) {
        database.users[req.query.name].age = req.query.age;
        serve(req, res, 204, 'application/json', JSON.stringify({ message: "User updated" }));
    }
    else {
        database.users[req.query.name] = {
            name: req.query.name,
            age: req.query.age
        };
        serve(req, res, 201, 'application/json', JSON.stringify({ message: "User added" }));
    }
}



module.exports = {
    getIndex,
    getCSS,
    getScript,
    getUsers,
    getNotFound,
    postAddUser
};