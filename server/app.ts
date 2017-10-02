/**
 * Created by rodrrap on 24/01/2017.
 */
import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as path from 'path';
import * as compression from 'compression';
import * as http from 'http';
import * as mongoose from 'mongoose';

const app: express.Application = express();

var cas = require('connect-cas');
var rootCas = require('ssl-root-cas').create();
rootCas.addFile(path.join(__dirname, '../../server/ssl/2.cer'));
rootCas.addFile(path.join(__dirname, '../../server/ssl/root2.cer'));
cas.configure({'host': 'ecas.cc.cec.eu.int:7002'});
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.disable('x-powered-by');
app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));


app.get('/', function (req:any, res, next) {
   if (req.session.cas && req.session.cas.user) {
       next();
   } else {
       return res.redirect('/login');
   }
});
app.get('/login', cas.serviceValidate(), cas.authenticate(), function (req, res) {
  return res.redirect('/');
});

console.log("##Environment="+app.get('env'));
if (app.get('env') === 'production') {
  // in production mode run application from dist folder
  app.use(express.static(path.join(__dirname, '../client')));
}

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next) {
  let err = new Error('Not Found');
  next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {

  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message
  });
});

var opts = {
  server: {
    socketOptions: {keepAlive: 1}
  }
};
//mongoose.connect('mongodb://localhost:27017/consultation');
//mongoose.connect('mongodb://doris:Doris1%B9A@S-CNECT-DORIS-D:27017/consultation?authSource=admin', opts);

const port = 3000;
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer( app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


/**
 * Event listener for HTTP server 'error' event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server 'listening' event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

export { app }
