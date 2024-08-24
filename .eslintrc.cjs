module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,

  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },

  settings: {
    imports: {
      extensions: ['.ts'],
      parser: {
        '@typescript-eslint/parser': ['.ts']
      },
      resolver: {
        typescript: {
          alwaysTryTypes: true,
          project: [
            "packages/tsconfig.json",
          ]
        }
      }
    }
  },

  env: {
    browser: true,
    es2021: true,
    node: true
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    // Base ESLint recommended rules
    // 'eslint:recommended',

    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
    // ESLint typescript rules
    'plugin:@typescript-eslint/recommended',

    // https://github.com/prettier/eslint-config-prettier#installation
    // usage with Prettier, provided by 'eslint-config-prettier'.
    'prettier',

    'plugin:typescript-paths/recommended'
  ],

  plugins: [
    // required to apply rules which need type information
    '@typescript-eslint',
    'prettier',
    'import',
    'typescript-paths',
    'eslint-plugin-paths'
  ],

  globals: {
    ga: 'readonly',
    console: true,
  },

  // add your custom rules here
  rules: {
    
    'prefer-promise-reject-errors': 'off',

    quotes: ['warn', 'single', { avoidEscape: true }],

    '@typescript-eslint/explicit-function-return-type': 'off',

    '@typescript-eslint/no-var-requires': 'off',

    'no-unused-vars': 'off',

    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    "paths/alias": "error"

  }
}
