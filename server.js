const app = require('./express')();
const port = app.get('port');
const loginRoute = require('./routes/login')
const bodyParser = require('body-parser');
app.use((bodyParser.urlencoded({
  extended: true
})))
app.use(bodyParser.json());
app.use(loginRoute)

// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});