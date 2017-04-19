module.exports = (wallaby) => {
  return {
    files: [
      'package.json',
      'lib/grammar.js',
      {pattern: 'src/**/*.js', load: true}
    ],
    tests: [
      {pattern: 'test/**/*.js', load: true},
      {pattern: 'test/fixtures/**/*', load: true}
    ],
    env: {
      type: 'node',
      params: {
        env: 'NODE_IDS=1'
      }
    },

    testFramework: 'mocha',

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    }
  }
}
