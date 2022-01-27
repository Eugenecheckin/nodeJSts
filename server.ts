const application = require('./app.ts');
const { PORT } = require('./config')

application.listen(PORT, ()=> {
  console.log('сервер запущен')
});