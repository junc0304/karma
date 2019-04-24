const {HOST, PORT} = require('./configuration');

const app = require('./app');
app.listen(PORT, () => {
    console.log(`KARMA Server started..`,`PORT: ${PORT}` );
});