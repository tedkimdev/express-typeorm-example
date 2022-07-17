import { Application } from "express";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import * as Controllers from "../api/controllers";

export function ExpressServerLoader(): Application {
  useContainer(Container);
  const expressApp: Application = createExpressServer({
    cors: true,
    classTransformer: true,
    defaultErrorHandler: false,
    middlewares: [],
    controllers: Object.values(Controllers),
  });
  expressApp.listen(process.env.PORT);

  return expressApp;
}
