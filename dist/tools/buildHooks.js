var fs = require('fs');
module.exports = {
    onBuildStart: function () { },
    onBuildComplete: function () {
        var tmpl = "/**Generated at " + new Date() + "}**/";
        // Go over all files in /dist....
        fs.readdir('./dist', function (err, files) {
            files.forEach(function (file) {
                if (file.match(/\.js$/)) { // only JS files
                    var contnet = fs.readFileSync("./dist/" + file, 'utf-8');
                    var newContent = tmpl + contnet;
                    fs.writeFileSync("./dist/" + file, newContent);
                }
            });
        });
    }
};
