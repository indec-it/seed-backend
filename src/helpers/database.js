process.loadEnvFile()
import oracledb from 'oracledb';
import {styleText} from 'node:util';

let pool;

export const connectDB = async () => {
  try {
    const {
      ORACLE_USER,
      ORACLE_PASSWORD,
      ORACLE_CONNECT_STRING,
      ORACLE_POOL_MIN = 5,
      ORACLE_POOL_MAX = 20,
      ORACLE_POOL_INCREMENT = 5
    } = process.env;

    if (!ORACLE_USER || !ORACLE_PASSWORD || !ORACLE_CONNECT_STRING) {
      throw new Error('Missing required Oracle connection environment variables');
    }

    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    oracledb.autoCommit = true;

    pool = await oracledb.createPool({
      user: ORACLE_USER,
      password: ORACLE_PASSWORD,
      connectString: ORACLE_CONNECT_STRING,
      poolMin: parseInt(ORACLE_POOL_MIN),
      poolMax: parseInt(ORACLE_POOL_MAX),
      poolIncrement: parseInt(ORACLE_POOL_INCREMENT),
      poolTimeout: 60
    });

    console.log(styleText('green', 'Connected to Oracle Database...'));
  } catch (err) {
    console.error('Oracle connection error:', err);
    process.exit(1);
  }
};

export const getConnection = async () => {
  if (!pool) {
    throw new Error('Database pool not initialized. Call connectDB first.');
  }
  return await pool.getConnection();
};

export const closeDB = async () => {
  if (pool) {
    await pool.close();
    console.log('Oracle Connection Pool Closed...');
    pool = null;
  }
};

export const executeQuery = async (sql, binds = [], options = {}) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(sql, binds, options);
    return result;
  } catch (err) {
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};