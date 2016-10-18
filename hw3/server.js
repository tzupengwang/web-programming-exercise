const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const http = require('http');
const winston = require('winston');

const app = express();

const PRODUCTION = (app.get('env') === 'production');

// logger
const loggerOptions = {
  console: {
    level: 'info',
    colorize: true,
    label: 'app',
  },
};
if (!PRODUCTION) {
  loggerOptions.console.level = 'debug';
}

winston.loggers.add('root', loggerOptions);
const logger = winston.loggers.get('root');
logger.cli();

// app settings
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routing rules
app.get('/', (req, res) => {
  res.send(`<html>
    <body>
      <h1>首頁</h1>
    </body>
</html>`);
});

app.get('/api/query', (req, res) => {
  res.send(req.query);
});

app.get('/api/users/:id', (req, res, next) => {
  if (req.params.id === '1') {
    res.json({
      id: 1,
      name: 'Joe',
      age: 16,
    });
  } else if (req.params.id === '2') {
    res.json({
      id: 2,
      name: 'John',
      age: 22,
    });
  } else next();
});

app.post('/api/body', (req, res) => {
  res.json(req.body);
});

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  res.send('404');
});

const server = http.createServer(app);
server.listen(app.get('port'), () => {
  logger.info(`Server started at: http://localhost:${app.get('port')}`);
});
