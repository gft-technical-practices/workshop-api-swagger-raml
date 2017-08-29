
const tools = require('./common').tools;
const config = require('../config.json');
const path = require('path');

module.exports.maven = async(builddir) => {
  const opts = config.builders.maven.options;
  const goal = config.builders.maven.goal;
  return new Promise((resolve, reject) => {
    tools.shell.exec(`mvn ${opts} -f ${builddir} ${goal}`, { silent: false }, (code, stdout, stderr) => {
      if (code === 0) {
        resolve('success');
      } else {
        console.error(stderr);
        reject('error');
      }
    });
  });
};

module.exports.docker = async(target, builddir) => {
  const where = path.resolve(builddir);
  return new Promise((resolve, reject) => {
    tools.shell.exec(`docker build -t ${target} ${where}`, { silent: false }, (code, stdout, stderr) => {
      if (code === 0) {
        resolve('success');
      } else {
        tools.shell.echo(stderr);
        reject('error');
      }
    });
  });
};

module.exports.clients = async(backdir) => {
  const res = [];
  res.push({javaclient: await this.maven(path.resolve(`${config.generator.generated}/java-client`))});
  return new Promise((resolve, reject) => {
    resolve(res);
  });
};

module.exports.servers = async(backdir) => {
  const res = [];
  const springresult = {
    springserver: 
      { 
        build: await this.maven(path.resolve(`${config.generator.generated}/spring-server`)),
      }
    }
  res.push(springresult);
  return new Promise((resolve, reject) => {
    resolve(res);
  });
};

module.exports.dockerServers = async() => {
  const res = [];
  const dockerresult = {
    springserver: await this.docker('spring-server:latest', path.resolve(`${config.generator.generated}/spring-server`)),
    nodejsserver: await this.docker('nodejs-server:latest', path.resolve(`${config.generator.generated}/nodejs-server-server`)),
    }
  res.push(springresult);
  return new Promise((resolve, reject) => {
      resolve(res);
  });
};
