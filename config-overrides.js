const {override, fixBabelImports} = require('customize-cra');

module.exports = override(
  // 组件 按需打包
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),

  
);