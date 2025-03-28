const yargs = require("yargs");
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .command(
    "sumar",
    "Suma 2 números",
    {
      num1: {
        describe: "Número 1",
        demandOption: true,
        type: "number",
      },
      num2: {
        describe: "Segundo número",
        demandOption: true,
        type: "number",
      },
    },
    (argv) => {
      console.log(`Resultado: ${argv.num1 + argv.num2}`);
    }
  )
  .help().argv;
