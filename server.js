const app = require('./express')();
const port = app.get('port');
const loginRoute = require('./routes/login')
const getRulesRoute = require('./routes/getRules')
const createUser = require('./routes/createUser')
const bodyParser = require('body-parser');
app.use((bodyParser.urlencoded({
  extended: true
})))
app.use(bodyParser.json());
app.use(loginRoute)
app.use(getRulesRoute)
app.use(createUser)

// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});