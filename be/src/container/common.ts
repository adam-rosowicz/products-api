import { AwilixContainer, asValue, asClass, asFunction } from "awilix";
import { QueryBus } from "@tshio/query-bus";
import { CommandBus } from "@tshio/command-bus";
import { EventDispatcher } from "@tshio/event-dispatcher";
import { createLogger, restrictFromProduction } from "@tshio/logger";
import { AppConfig } from "../config/app";
import { createRouter } from "../app/router";
import { mongoDbConfig } from "../config/db";

export async function registerCommonDependencies(appConfig: AppConfig, container: AwilixContainer) {
  container.register({
    restrictFromProduction: asValue(restrictFromProduction(appConfig.env)),
    port: asValue(appConfig.port),
    logger: asValue(createLogger(process.env, ["accessToken", "refreshToken"])),
    appConfig: asValue(appConfig),
    mongoDbConfig: asValue(mongoDbConfig),
    router: asFunction(createRouter).singleton(),
    queryBus: asClass(QueryBus).classic().singleton(),
    commandBus: asClass(CommandBus).classic().singleton(),
    eventDispatcher: asClass(EventDispatcher)
      .classic()
      .singleton()
      .inject(() => ({ throwOnFailure: false })),
  });

  return container;
}
