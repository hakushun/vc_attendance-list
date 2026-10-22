import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import nextPlugin from '@next/eslint-plugin-next';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default defineConfig(
  {
    ignores: ['.next/', 'public/', 'node_modules/'],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  importPlugin.flatConfigs.typescript,
  nextPlugin.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Best Practices
      'consistent-return': ['error', { treatUndefinedAsUnspecified: true }],
      'no-implicit-globals': 'error',
      'no-invalid-this': 'error',
      'no-param-reassign': ['error', { props: false }],
      'no-unmodified-loop-condition': 'error',
      'no-useless-call': 'error',
      'no-label-var': 'error',
      'no-undef-init': 'error',
      'no-undefined': 'error',

      // ES2015
      'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
      'prefer-spread': 'error',

      // React
      'react/display-name': 'off',
      'react/prop-types': 'off',
      'react/no-danger': 'error',
      'react/no-did-mount-set-state': 'error',
      'react/no-did-update-set-state': 'error',
      'react/no-set-state': 'error',
      'react/prefer-stateless-function': 'error',

      // TypeScript
      // コア版の no-shadow / no-unused-expressions は型の宣言などで誤検知するため TS 版を使う
      '@typescript-eslint/no-shadow': [
        'error',
        { allow: ['cb', 'next', 'req', 'res', 'err', 'error'] },
      ],
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // RootState などの型を値の import で書くと import/no-cycle に循環として検出されるため、型は import type に揃える
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'separate-type-imports' },
      ],

      // import
      'import/no-cycle': 'error',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  },
  {
    files: ['src/**/__tests__/**', 'src/setupTests.ts'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  prettier,
);
