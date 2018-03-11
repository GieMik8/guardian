import { inDevelopment } from '~helpers/index';
import * as devEnvironment from './environment.dev';
import * as prodEnvironment from './environment.prod';

const settings = inDevelopment ? devEnvironment : prodEnvironment;
export default settings;
