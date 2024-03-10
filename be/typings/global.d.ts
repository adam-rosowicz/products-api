import { AwilixContainer } from "awilix";
import { IncomingHttpHeaders } from "http";

declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

declare global {
  namespace NodeJS {
    interface Global {
      container: AwilixContainer;
    }
  }

  var container: AwilixContainer;

  namespace Express {
    export interface Request {
      headers: IncomingHttpHeaders & {
        "x-api-key"?: string;
      };
    }
  }
}
