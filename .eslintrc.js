module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    '@react-native-community',
    'plugin:prettier/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-native',
    '@typescript-eslint',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-filename-extension': 'off',
    'react/destructuring-assignment': 'off',
    'react/prop-types': 'off',
    'import/extensions': 'off',
    'react/jsx-props-no-spreading': 'warn',
    semi: 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
