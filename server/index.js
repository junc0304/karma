const {HOST, PORT} = require('./configuration');

const app = require('./app');
app.listen(PORT, HOST , () => {
    console.log(`KARMA Server started..`, `Port: ${PORT}`, `Host: ${HOST}` );
});