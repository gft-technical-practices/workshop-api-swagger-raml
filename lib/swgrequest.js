const tools = require('./common.js').tools;
const config = require('../config.json');
const rp = require('request-promise');
const request = require('request')
const fs = require('fs-extra');
const path = require('path');

module.exports.createServer = (type, callback) => {
  tools.shell.echo(`Creating ${type} server...`);
  if (type !== 'loopback') {
    fs.ensureDirSync(path.resolve(config.generator.output));
    const options = {
      method: 'POST',
      uri: `${config.generator.servers.url}/${type}`,
      body: {
        swaggerUrl: config.api.swagger,
        options: config.generator.servers.spring.options
      },
      json: true // Automatically stringifies the body to JSON 
    }
    rp(options)
      .then((body) => {
        tools.shell.echo(body);
        request(body.link)
          .pipe(fs.createWriteStream(`${config.generator.output}/${type}-server.zip`));
      })
      .catch((err) => {
        tools.shell.echo(err);
      });

  } else {
    tools.shell.echo('Creating loopback server api...');
  };
};