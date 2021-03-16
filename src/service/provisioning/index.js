// @flow
import { Db } from 'mongodb';

import logger from '../winston';
import { createIndex } from '../../persistance/dal';

const start = async (db: Db) => {
  try {
    logger.info('Provisioning...');

    logger.debug('Create indexes...');
    await createIndex(db);
    logger.debug('Create indexes done.');

    logger.info('Provisioning done.');
  } catch (err) {
    logger.error(err.stack);
    process.exit(1);
  }
};

export default start;
