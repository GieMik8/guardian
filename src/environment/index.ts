import { inDevelopment } from '~helpers/index';
import * as devEnvironment from './environment.dev';
import * as prodEnvironment from './environment.prod';

export const SLOGAN: string = 'World\'s leading liberal voice';
export const VERSION: number = 0.3;

const env = inDevelopment ? devEnvironment : prodEnvironment;

const settings = {
  ...env,
  SLOGAN,
  VERSION
};

export default settings;
