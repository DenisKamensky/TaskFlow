// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@', path.resolve(__dirname, 'src')],
            ['@app', path.resolve(__dirname, 'src/app')],
            ['@pages', path.resolve(__dirname, 'src/pages')],
            ['@features', path.resolve(__dirname, 'src/features')],
            ['@entities', path.resolve(__dirname, 'src/entities')],
            ['@shared', path.resolve(__dirname, 'src/shared')],
            ['@assets', path.resolve(__dirname, 'src/assets')]
          ],
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
        }
      }
    },
  },
])
