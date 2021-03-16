import ENDPOINTS from '../common/endpoints';
import alive from './alive';

const loadRouters = (app) => {
  app.use(ENDPOINTS.alive.path, alive);
};

export default loadRouters;
