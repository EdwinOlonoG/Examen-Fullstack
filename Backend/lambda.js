const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app'); // Tu código de Express debe estar en un archivo separado (app.js)
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
    awsServerlessExpress.proxy(server, event, context);
};