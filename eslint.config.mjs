import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      js,
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      'prettier/prettier': 'error',
      'no-console': 'warn',
      eqeqeq: ['error', 'always'],
      curly: 'error',
      'no-debugger': 'warn',
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'no-redeclare': 'warn',
      'no-shadow': 'warn',
      'default-case': 'warn',
      'dot-notation': 'warn',
      'no-magic-numbers': 'warn',
      ...prettierConfig.rules,
    },
  },
]);
