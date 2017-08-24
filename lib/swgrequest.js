const tools = require('./common.js').tools;
const config = require('../config.json');
const rp = require('request-promise');
const request = require('request')
const fs = require('fs-extra');
const path = require('path');
const decompress = require('decompress');

module.exports.create = (spec, framework, type, options) => {
  fs.ensureDirSync(path.resolve(config.generator.output));
  const opt = {
    method: 'POST',
    uri: type === 'server' ? `${config.generator.servers.url}/${framework}`:`${config.generator.clients.url}/${framework}`,
    body: {
      spec: spec,
      options: options
    },
    json: true
  }
  rp(opt)
  .then((body) => {
    tools.shell.echo(body);
    let link = body.link;
    // Ajuste técnico... quando geramos os clients
    // o swagger-generator envia o link de forma errada
    if (link.startsWith('http:///api')) {
      link = 'http://localhost:9000/api' + link.substring('http:///api'.length);
    }
    request(link)
      .pipe(fs.createWriteStream(`${config.generator.output}/${framework}-${type}.zip`));
  })
  .catch((err) => {
    tools.shell.echo(err);
  });

};

module.exports.createServer = (spec, framework, callback) => {
  tools.shell.echo(`Creating ${framework} server...`);
  if (framework !== 'loopback') {
    this.create(spec, framework, 'server', config.generator.servers[framework].options);
  } else {
    tools.shell.echo('Loopback feature is under construction...');
  };
};

module.exports.createClient = (spec, framework, callback) => {
  tools.shell.echo(`Creating ${framework} client...`);
  if (framework !== 'loopback') {
    this.create(spec, framework, 'client', config.generator.clients[framework].options);
  } else {
    tools.shell.echo('Loopback client is not a feature!');
  };
};