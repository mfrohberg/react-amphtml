const typescriptEslintRecommended = require('@typescript-eslint/eslint-plugin/dist/configs/recommended.json');
const typescriptEslintPrettier = require('eslint-config-prettier/@typescript-eslint');

module.exports = {
  env: {
    node: true,
  },
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['rollup.config.js', '**/__tests__/**/*'],
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        devDependencies: [
          'rollup.config.js',
          '.eslintrc.js',
          '**/__tests__/**/*',
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      // NOTE: Workaround for no nested extends possible.
      // See https://github.com/eslint/eslint/issues/8813.
      // Working solution would be following, if we had nested extends:
      // ```
      // extends: [
      //   'airbnb-base',
      //   'plugin:@typescript-eslint/recommended',
      //   'prettier/@typescript-eslint',
      //   'prettier',
      // ],
      // ```
      plugins: ['@typescript-eslint', 'prettier'],
      rules: Object.assign(
        typescriptEslintRecommended.rules,
        typescriptEslintPrettier.rules,
        {
          '@typescript-eslint/explicit-function-return-type': 'error',
        },
      ),
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.js', '.ts', '.tsx'],
          },
        },
      },
    },
    {
      files: ['setupTest.js', 'setupTest.ts', '*.spec.ts', '*.spec.tsx'],
      env: {
        jest: true,
      },
    },
  ],
};
