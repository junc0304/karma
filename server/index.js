const config = require('./configuration');

const app = require('./app');
const host = config.host;
const port = config.port;
app.listen(port, host , () => {
    console.log(`KARMA Server started..`, `Port: ${port}`, `Host: ${host}` );
});