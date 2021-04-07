const { exec } = require('child_process');

let command;

console.log(`Valor da variável ENV: ${process.env.ENV}`);

if (process.env.ENV === 'prod') {
    command = exec('ng build --aot --configuration=prod');
} else {
    console.log('configurando DEV...');
    command = exec('ng build --aot --environment=dev');
}

if (command != undefined) {
    command.stdout.on('data', (data) => {
        console.log(data);
    });

    command.stderr.on('data', (data) => {
        console.error(data);
    });

    command.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
} else {
    console.error('process.env.ENV: ' + process.env.ENV);
}
