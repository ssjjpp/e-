var fs = require('fs');
console.log(fs);
fs.readFile('./main.js', 'utf-8', function(err, data) {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log(data);
});