const fs = require('fs');
const heroku = `export const environment = {
   production: true,
   API_TICKET: '${process.env.API_AMBIENTE}'
}`
fs.writeFile('src/environments/environment.prod.ts', heroku, (err, result) => {
   if(err){
      console.log('Falha ao escrever arquivo');
   }
});
