import { Joi } from "celebrate";
import { pipeline } from "ts-pipe-compose";
import { loadEnvs } from "./env";

loadEnvs();

export interface MongoDbConfig {
  uri: string;
  dbName: string;
}

const loadDbConfigFromEnvs = (env: any) => ({
  uri: env.ME_CONFIG_MONGODB_URL,
  dbName: env.ME_CONFIG_MONGODB_DBNAME,
});

const validateDbConfig = (config: MongoDbConfig) => {
  const schema = Joi.object().keys({
    dbName: Joi.string().required(),
    uri: Joi.string().required(),
  });

  const { error, value } = schema.validate(config);

  if (error) {
    throw error;
  }

  return value;
};

const createDbConfigFromEnvs = pipeline(loadDbConfigFromEnvs, validateDbConfig);

export const mongoDbConfig = createDbConfigFromEnvs(process.env);
