const tools = require('./common.js').tools;
const config = require('../config.json');
const rp = require('request-promise');
const request = require('request')
const fs = require('fs-extra');
const path = require('path');
const decompress = require('decompress');
const unzip = require('unzipper');

module.exports.prepareEnvironment = () => {
  fs.ensureDirSync(path.resolve(config.generator.download));
  fs.ensureDirSync(path.resolve(config.generator.generated));
};

module.exports.queryFrameworks = (type) => {
  this.prepareEnvironment();
  const opt = {
    method: 'GET',
    uri: type === 'server' ? `${config.generator.servers.url}` : `${config.generator.clients.url}`,
    json: true
  }
  return rp(opt)
    .then((body) => {
      tools.shell.echo(body);
      return body;
    })
    .catch((err) => {
      tools.shell.echo(err);
      return undefined;
    });
};

module.exports.create = (spec, framework, type, options) => {
  this.prepareEnvironment();
  const opt = {
    method: 'POST',
    uri: type === 'server' ? `${config.generator.servers.url}/${framework}` : `${config.generator.clients.url}/${framework}`,
    body: {
      spec: spec,
      options: options
    },
    json: true
  }
  const download = path.resolve(`${config.generator.download}/${framework}-${type}.zip`);
  const target = path.resolve(`${config.generator.generated}/`);
  return rp(opt)
    .then((body) => {
      tools.shell.echo(body);
      let link = body.link;
      // Ajuste técnico... quando geramos os clients
      // o swagger-generator envia o link de forma errada
      if (link.startsWith('http:///api')) {
        link = 'http://localhost:9000/api' + link.substring('http:///api'.length);
      }
      request(link)
        //.pipe(fs.createWriteStream(download));
        .pipe(unzip.Extract({
          path: target
        }))
      return path.resolve(target);
    })
    .catch((err) => {
      tools.shell.echo(err);
      return undefined;
    });

};

module.exports.isSupportedClientFramework = async(framework) => {
  const frameworkList = await this.queryFrameworks('client');
  if (frameworkList) {
    return frameworkList.find((frm) => {
      return frm === framework;
    })
  }
};

module.exports.isSupportedServerFramework = async(framework) => {
  const frameworkList = await this.queryFrameworks('server');
  if (frameworkList) {
    return frameworkList.find((frm) => {
      return frm === framework;
    })
  }
};

module.exports.createClient = async(spec, framework) => {
  tools.shell.echo(`Creating ${framework} client...`);
  if (this.isSupportedClientFramework(framework)) {
    const zip = await this.create(spec, framework, 'client', config.generator.clients[framework].options);
    tools.shell.echo(`Client ${framework} is created`); 
  } else {
    tools.shell.echo(`Client ${framework} is not supported!!`);
  }
};

module.exports.createServer = async(spec, framework) => {
  tools.shell.echo(`Creating ${framework} server...`);
  if (this.isSupportedServerFramework(framework)) {
    const zip = await this.create(spec, framework, 'server', config.generator.servers[framework].options);
    tools.shell.echo(`Server ${framework} is created`);
  } else {
    tools.shell.echo(`Server ${framework} is not supported!!`);
  };
};