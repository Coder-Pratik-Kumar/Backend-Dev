const fs = require('fs').promises;
const path = require('path');

async function syncDirectories(source, target) {
  try {
    const sourceFiles = await fs.readdir(source);
    const targetFiles = await fs.readdir(target);

    for (let file of sourceFiles) {
      if (!targetFiles.includes(file)) {
        await fs.copyFile(
          path.join(source, file),
          path.join(target, file)
        );
        console.log(`Copied: ${file}`);
      }
    }
  } catch (err) {
    console.error("Sync error:", err.message);
  }
}

syncDirectories('./dir1', './dir2');
