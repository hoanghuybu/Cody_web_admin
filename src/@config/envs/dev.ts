import { IEnvConfig } from "..";

const config: IEnvConfig = {
  name: "DEVELOPMENT",
  CONNECTORS: {
    ROOT: {
      // baseUrl: process.env.REACT_APP_API_URL || "http://localhost:3001",
      baseUrl: "http://localhost:3001",
    },
  },
};

export default config;
