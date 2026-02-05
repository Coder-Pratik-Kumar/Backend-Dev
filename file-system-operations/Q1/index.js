const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function readFile() {
  const file = await ask("Enter file name: ");
  try {
    const data = await fs.readFile(file, 'utf8');
    console.log("\nFile Content:\n", data);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

async function writeFile() {
  const file = await ask("Enter file name: ");
  const content = await ask("Enter content: ");
  await fs.writeFile(file, content, 'utf8');
  console.log("File written successfully");
}

async function copyFile() {
  const src = await ask("Enter source file: ");
  const dest = await ask("Enter destination file: ");
  await fs.copyFile(src, dest);
  console.log("File copied successfully");
}

async function deleteFile() {
  const file = await ask("Enter file to delete: ");
  await fs.unlink(file);
  console.log("File deleted successfully");
}

async function listDirectory() {
  const dir = await ask("Enter directory path (. for current): ");
  const files = await fs.readdir(dir);
  console.log("\nDirectory Contents:");
  files.forEach(f => console.log(f));
}

async function main() {
  while (true) {
    console.log(`
1. Read File
2. Write File
3. Copy File
4. Delete File
5. List Directory
6. Exit
    `);

    const choice = await ask("Enter choice: ");

    switch (choice) {
      case '1': await readFile(); break;
      case '2': await writeFile(); break;
      case '3': await copyFile(); break;
      case '4': await deleteFile(); break;
      case '5': await listDirectory(); break;
      case '6': rl.close(); return;
      default: console.log("Invalid choice");
    }
  }
}

main();
