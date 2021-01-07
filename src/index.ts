import minimist from 'minimist';
import * as process from 'process';

export default function main() {
  const args = minimist(process.argv.slice(2));
  if (args._.length === 0) {
    console.error('Pass a command');
    return;
  }
  switch (args._[0].toLowerCase()) {
    case 'analyze':
      "yarn react-scripts build && yarn source-map-explorer 'build/static/js/*.js'";
      break;
    case 'react-start':
      'react-scripts start';
      break;
    case 'react-build':
      'react-scripts build';
      break;
    case 'react-test':
      'react-scripts test';
      break;
    case 'react-eject':
      'react-scripts eject';
      break;
    case 'electron-build':
      'electron-builder';
      break;
    case 'release':
      'yarn build && electron-builder --publish=always';
      break;
    case 'clean':
      'rimraf public/main public/*.js public/*.js.map .ts*.tsbuildinfo';
      break;
    case 'build':
      'yarn clean && yarn prepare && yarn react-build';
      break;
    case 'start':
      'yarn prepare && concurrently --kill-others "cross-env BROWSER=none yarn react-start" "wait-on http://localhost:3000 && electron ."';
      break;
    case 'prepare':
      'tsc -p tsconfig.static.json && tsc -p tsconfig.render.json';
      break;
    case 'tsc':
      'tsc';
      break;
    case 'compile':
      'tsc --noEmit && tsc --noEmit -p tsconfig.static.json && tsc --noEmit -p tsconfig.render.json';
      break;
    case 'test':
      'jest --config jest.jsdom.config.js && jest --config jest.node.config.js --passWithNoTests';
      break;
    case 'testui':
      'jest --config jest.jsdom.config.js --watch';
      break;
    case 'testnode':
      'jest --config jest.node.config.js --watch';
      break;
    case 'format':
      'prettier --write "src/**/*.ts" "src/**/*.tsx" "static/**/*.ts" "*.js" "*.json" "*.md" "src/**/*.css" .prettierrc';
      break;
    case 'lint':
      'yarn eslint --fix --ext .ts --ext .tsx ./';
      break;
    case 'chk':
      'yarn compile && yarn lint && yarn test';
      break;
    case 'linecount':
      'git ls-files|grep "\\.\\(css\\|ts\\|tsx\\)$"|grep -v "__\\|\\.d\\.ts"|xargs wc -l';
      break;
  }
}
