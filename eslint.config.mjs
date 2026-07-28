import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import unusedImports from 'eslint-plugin-unused-imports'

const eslintConfig = defineConfig([
    ...nextVitals,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsParser,
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            'unused-imports': unusedImports,
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'off',

            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    'vars': 'all',
                    'varsIgnorePattern': '^_',
                    'args': 'after-used',
                    'argsIgnorePattern': '^_',
                },
            ],
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'prefer-const': 'error',
            'eqeqeq': ['error', 'always'],
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    globalIgnores([
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts',
        'node_modules/**',
    ]),
])

export default eslintConfig