import js from '@eslint/js'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import prettier from 'eslint-plugin-prettier/recommended'

export default [
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
  js.configs.recommended,
  ...nextVitals,
  ...nextTypescript,
  prettier,
  {
    linterOptions: { reportUnusedDisableDirectives: 'error' },
    rules: {
      '@next/next/no-img-element': 'off',
      'prefer-const': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-unused-expressions': 'error',
    },
  },
]
