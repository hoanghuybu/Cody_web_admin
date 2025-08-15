import * as envs from "./envs";

export interface IEnvConfig {
  name?: string;
  CONNECTORS: {
    ROOT: {
      baseUrl: string;
    };
  };
}
const envConfig: IEnvConfig = undefined;

// Define allowed environment names based on keys of envs
// type EnvName = keyof typeof envs;

export function configEnv(): IEnvConfig {
  if (envConfig) {
    return envConfig;
  }
  // const envName = (process.env.REACT_APP_ENV as EnvName) || "dev";
  const envName = "dev";
  const currentConfig = envs[envName];
  return {
    ...currentConfig,
    name: envName,
  };
}
