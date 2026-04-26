module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  ignoreFiles: ['dist/**', 'node_modules/**'],
  rules: {
    'selector-class-pattern': null,
    'order/properties-order': [
      [
        'position',
        'z-index',
        'top',
        'right',
        'bottom',
        'left',
        'display',
        'box-sizing',
        'width',
        'min-width',
        'max-width',
        'height',
        'min-height',
        'max-height',
        'margin',
        'padding',
        'font',
        'font-family',
        'font-size',
        'line-height',
        'color',
        'background',
        'background-color',
        'border',
        'border-radius',
        'opacity',
        'transition',
        'transform',
        'animation'
      ],
      {
        unspecified: 'bottomAlphabetical'
      }
    ]
  },
};
