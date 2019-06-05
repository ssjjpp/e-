const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const cipher = crypto.createCipher('aes192', 'a password');
const dcipher = crypto.createDecipher('aes192', 'a password');

// const input = fs.createReadStream('./test.mp4');
// const output = fs.createWriteStream('tests.mp4');

// input.pipe(dcipher).pipe(output);



Clonedir('./copydir', 'copydirss', function(pathname, newname, size) {
    // if (size / 1024 / 1024 > 200) {
    //     var rs = fs.createReadStream(pathname);
    //     var ws = fs.createWriteStream(newname);
    //     rs.pipe(cipher).pipe(ws);
    // } else {
    //     fs.writeFileSync(newname, fs.readFileSync(pathname));
    // }
    var rs = fs.createReadStream(pathname);
    var ws = fs.createWriteStream(newname);
    rs.pipe(dcipher).pipe(ws);
});

function Clonedir(src, copydir, callback) {
    fs.readdir(path.resolve(src), function(err, paths) {
        if (err) {
            throw err;
        }

        paths.forEach(function(file) {
            var pathname = path.resolve(src, file);
            var newname = path.resolve(copydir, file);
            fs.stat(pathname, function(err, st) {
                if (err) {
                    throw err;
                }
                if (st.isFile()) {
                    callback && callback(pathname, newname, st.size)
                } else {
                    if (!fs.existsSync(newname)) {
                        fs.mkdirSync(newname);
                    }
                    Clonedir(pathname, newname, callback)
                }
            })
        })
    });
}