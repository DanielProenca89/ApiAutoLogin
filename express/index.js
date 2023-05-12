const express = require('express');
require('dotenv').config()


module.exports = () => {
  const app = express();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT);



  return app;
};

