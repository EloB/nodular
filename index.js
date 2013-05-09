module.exports = process.env.NODULAR_COV
  ? require('./lib-cov/nodular')
  : require('./lib/nodular');