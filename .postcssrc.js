// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
  'plugins': {
    // to edit target browsers: use "browserslist" field in package.json
    'postcss-import': {},
    'autoprefixer': {},
    'postcss-plugin-px2rem': {
      rootValue: 75, // 这里对应的是750的设计图尺寸
      selectorBlackList: ['html'],
      mediaQuery: true,
      propBlackList: ['border-radius', 'border'] // 如果要保持font-size不转换，替换为 ['font-size']
    }
  }
}
