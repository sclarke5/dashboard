const express = require('express');
const next = require('next');
// const cors = require('cors');
const db = require('./models/index.js');
const Role = db.role;
require('dotenv').config();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3001;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const initial = () => {
  Role.create({
    id: 1,
    name: 'user'
  })

  Role.create({
    id: 2,
    name: 'moderator'
  })

  Role.create({
    id: 3,
    name: 'admin'
  })
}

db.sequelize.sync().then(() => {
  // console.log('Drop and Resync DB');
  // initial()
});

require

app
  .prepare()
  .then(() => {
    const server = express();

    // parse requests of content-type - application/json
    server.use(bodyParser.json());

    // parse requests of content-type - application/x-www-form-urlencoded
    server.use(bodyParser.urlencoded({ extended: true }));

    server.get('/api/test', (req, res) => {
      res.json({message: 'Welcome to the thing'})
    })

    require('./routes/auth')(server);
    require('./routes/user')(server);

    server.get('*', (req, res) => {
      return handle(req, res);
    })

    server.listen(port, () => {
      // if(err) throw err;
      console.log(`Ready on port ${port}`);
    })
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  })