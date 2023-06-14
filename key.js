const crypto = require('crypto');
const fs     = require('fs');
const path   = require('path');

const metadataFolder = './metadata';
const hashes = []; // Array to store all the hashes

async function main () {
    
  fs.readdir(metadataFolder, (err, files) => {
    
    if (err) throw err;

     files.forEach(fileNumber => {
     const filePath = path.join(metadataFolder, fileNumber);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const hash = crypto.createHash('sha256').update(data).digest('hex');
        hashes.push(hash); 
        console.log(`The hash for the ${fileNumber} is ${hash}`);

        if (hashes.length === files.length) {
            let concatenatedHashes = hashes.join('');       
                console.log(`Before: ${concatenatedHashes}`);
          const provanceHash = crypto.createHash('sha256').update(concatenatedHashes).digest('hex');
          console.log(`Provance Hash is ${provanceHash}`)
        }
      }
    });
  });
});

}

main();


