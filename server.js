var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var config = require('./webpack-dev.config');
var fs = require('fs');
// https://devcenter.heroku.com/articles/ssl-certificate-self
var cert = fs.readFileSync(path.join(__dirname, "./server.crt"));
var key = fs.readFileSync(path.join(__dirname, "./server.key"));

new WebpackDevServer(webpack(config), {
    contentBase: 'public/',
    publicPath: '',
    inline: true,
    hot: true,
    https: {
      cert: cert,
      key: key
    }
}).listen(3443, 'localhost', function (err, result) {
    if (err) {
        return console.log(err);
    }
    console.log('Listening at https://localhost:3443/');
});
