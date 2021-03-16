import config from 'config';
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

import logger from '../../service/winston';

export const checkMongoDB = async (db) => {
  try {
    return await db.stats().then(() => true).catch(() => false);
  } catch (err) {
    return false;
  }
};

// eslint-disable-next-line
export const createIndex = async (db) => {
  await Promise.all([
  ]);
};

export const connectMongoDB = async () => {
  try {
    let client;
    if (config.get('DAL.MONGODB.IN_MEMORY')) {
      logger.debug('Create in memory MongoDB instance...');
      const mongod = new MongoMemoryServer({ instance: { dbName: config.get('DAL.MONGODB.DATABASE') }, debug: true });
      const uri = await mongod.getConnectionString();
      client = await MongoClient.connect(uri);
      logger.debug('Create in memory MongoDB instance done.');

      return client.db(config.get('DAL.MONGODB.DATABASE'));
    }

    logger.debug('Create MongoDB instance...');
    client = await MongoClient.connect(
      config.get('DAL.MONGODB.CONNECTION_STRING'),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    logger.debug('MongoDB instance created.');

    return client.db(config.get('DAL.MONGODB.DATABASE'));
  } catch (err) {
    logger.error(err.stack);
    throw new Error(err);
  }
};
