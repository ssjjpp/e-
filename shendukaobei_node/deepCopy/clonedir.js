var fs = require('fs');
var path = require('path');
Clonedir('src', 'copydir', function(pathname, newname, size) {
    if (size / 1024 / 1024 > 200) {
        var rs = fs.createReadStream(pathname);
        var ws = fs.createWriteStream(newname);
        rs.pipe(ws);
    } else {
        fs.writeFileSync(newname, fs.readFileSync(pathname));
    }
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