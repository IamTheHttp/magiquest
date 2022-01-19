let fs = require('fs');

module.exports = {
  onBuildStart: () => {},
  onBuildComplete: () => {
    let tmpl = `/**Generated at ${new Date()}}**/`;

    // Go over all files in /dist....
    fs.readdir('./dist', (err, files) => {
      files.forEach((file) => {
        if (file.match(/\.js$/)) {
          // only JS files
          let contnet = fs.readFileSync(`./dist/${file}`, 'utf-8');
          let newContent = tmpl + contnet;

          fs.writeFileSync(`./dist/${file}`, newContent);
        }
      });
    });
  }
};
