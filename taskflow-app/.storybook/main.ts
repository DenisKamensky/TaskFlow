import type { StorybookConfig } from '@storybook/react-vite';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
   async viteFinal(config) {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
        '@app': path.resolve(__dirname, '../src/app'),
        '@pages': path.resolve(__dirname, '../src/pages'),
        '@features': path.resolve(__dirname, '../src/features'),
        '@entities': path.resolve(__dirname, '../src/entities'),
        '@shared': path.resolve(__dirname, '../src/shared'),
        '@assets': path.resolve(__dirname, '../src/assets'),
      };
    }
    return config;
  },
};
export default config;