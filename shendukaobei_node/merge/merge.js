var fs = require('fs');
var path = require('path');
fs.readdir(path.resolve('src'), function(err, paths) {
    if (err) {
        throw err;
    }

    var js = path.resolve('script', 'script.min.js');
    var css = path.resolve('style', 'style.min.css');
    if (fs.existsSync(js)) {
        fs.writeFileSync(js, '');
    }
    if (fs.existsSync(css)) {
        fs.writeFileSync(css, '');
    }

    paths.forEach(function(file) {
        var pathname = path.resolve('src', file);
        if (path.extname(pathname) === '.js') {
            combine('script', pathname, function(pathname) {
                fs.appendFileSync(js, '\n' + fs.readFileSync(pathname));
            });
        } else if (path.extname(pathname) === '.css') {
            combine('style', pathname, function(pathname) {
                fs.appendFileSync(css, '\n' + fs.readFileSync(pathname));
            });
        }
    });
});

function combine(dist, pathname, callback) {
    if (!fs.existsSync(path.resolve(dist))) {
        fs.mkdirSync(path.resolve(dist));
    }
    callback && callback(pathname);
}