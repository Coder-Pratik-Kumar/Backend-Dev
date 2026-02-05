const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('app.log');

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

let total = 0, errors = 0, warnings = 0;

rl.on('line', (line) => {
  total++;
  if (line.includes('ERROR')) errors++;
  if (line.includes('WARN')) warnings++;
});

rl.on('close', () => {
  console.log("Log Analysis Report");
  console.log("Total Lines:", total);
  console.log("Errors:", errors);
  console.log("Warnings:", warnings);
});
