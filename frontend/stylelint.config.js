module.exports = {
  extends: ['stylelint-config-sass-guidelines', 'stylelint-config-prettier'],
  rules: {
    'function-parentheses-space-inside': 'never-single-line',
    'max-nesting-depth': [
      5,
      {
        ignoreAtRules: ['media', 'supports', 'include'],
      },
    ],
    'scss/at-extend-no-missing-placeholder': null,
    'selector-class-pattern': [
      '^([.%]?[a-z]*[-]?[a-z0-9-]*)(.[a-z0-9-]*)?(__[a-z0-9]*[-]?[a-z0-9-]*)?(--[a-z0-9]*[-]?[a-z0-9-]*)?(:[a-z]*)*$',
      {
        message:
          'Selector should be written in lowercase with hyphens, preferably in BEM-style (selector-class-pattern)',
      },
    ],
    'selector-max-compound-selectors': 5,
    'selector-no-qualifying-type': null,
    'scss/selector-no-redundant-nesting-selector': null,
  },
}
