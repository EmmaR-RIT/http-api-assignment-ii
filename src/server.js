const http = require('http');
const responses = require('./responses.js');


const port = process.env.PORT || process.env.NODE_PORT || 3000;


const routes = {
    '/': responses.getIndex,
    '/style.css': responses.getCSS,
    '/bundle.js': responses.getScript,
    '/getUsers': responses.getUsers,
    '/addUser': responses.postAddUser,
    notFound: responses.getNotFound
}


const onRequest = (req, res) => {
    // Parse url
    const url = new URL(req.url, `${req.connection.encrypted ? 'https' : 'http'}://${req.headers.host}`);

    // Set the url query
    req.query = Object.fromEntries(url.searchParams);

    // Send request to the correct route
    if (routes[url.pathname]) routes[url.pathname](req, res);
    else routes.notFound(req, res);
}


http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`); // eslint-disable-line no-console
})