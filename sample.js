const jsonFilePath = './example.json'; // Make sure to specify the correct file path

let sampleString = ''
const fs = require('fs')
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error:', err);
        sampleString = err.toString();
        return;
    }
    let jsonData = JSON.parse(data);
    console.log(jsonData); // This is the JSON data

    // Convert jsonData to a key-value pair string
    let keyValueString = '';
    for (let key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
            keyValueString += `${key}: ${jsonData[key]}\n`;
        }
    }

    console.log(keyValueString); // This is the key-value pair string
    sampleString = keyValueString;
});

console.log(sampleString)