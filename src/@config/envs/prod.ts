import { IEnvConfig } from "..";

const config: IEnvConfig = {
  name: "PRODUCTION",
  CONNECTORS: {
    ROOT: {
      // baseUrl:
      //   process.env.REACT_APP_API_URL ||
      //   "http://localhost:3001",
      baseUrl: "https://www.cody-be.online/api/v1",
    },
  },
};

export default config;
