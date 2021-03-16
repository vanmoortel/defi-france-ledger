// @flow
import { Db } from 'mongodb';

import type { Response } from '../../type/response';
import { ERROR_ALIVE, ERROR_ALIVE_MONGODB_NOT_ALIVE } from '../../../common/errors';
import logger from '../../../service/winston';
import { checkMongoDB } from '../../../persistance/dal';

const checkAlive = async (db: Db): Promise<Response<boolean>> => {
  try {
    const resultCheckMongoDB: Promise<boolean> = await checkMongoDB(db);
    if (!resultCheckMongoDB) return ERROR_ALIVE_MONGODB_NOT_ALIVE;
    return { status: 200, data: true };
  } catch (err) {
    logger.error(err.stack);
    return ERROR_ALIVE;
  }
};

export default checkAlive;
