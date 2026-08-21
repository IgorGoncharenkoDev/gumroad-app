import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import importPlugin from 'eslint-plugin-import'
import perfectionist from 'eslint-plugin-perfectionist'
import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    plugins: {
      perfectionist,
      import: importPlugin,
    },
    rules: {
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'error',
      'import/order': 'off',

      'object-shorthand': ['warn', 'always'],

      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',

          // 🧩 This defines your architecture layers
          groups: [
            'builtin', // node: fs, path, etc
            'external', // react, next, lodash
            'internal', // "@/..."
            ['parent', 'sibling', 'index'], // ../, ./same-folder, ./index
            'unknown',
          ],

          // treat "@/..." as internal
          internalPattern: ['^@/'],
        },
      ],

      'perfectionist/sort-named-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],

      'perfectionist/sort-exports': 'error',

      'perfectionist/sort-interfaces': 'error',

      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: true,
          ignoreCase: true,
          noSortAlphabetically: false,
        },
      ],
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
