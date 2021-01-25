import express from 'express';
import * as bodyParser from "body-parser";
import "reflect-metadata";

/**
 * Controllers (route handlers).
 */
import { CurrencyController } from "./src/controllers/currency";
import { RatesController } from './src/controllers/rates';


/**
 * Create Express server.
 */
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 3000);

/**
 * Start Express server.
 */
app.listen(app.get("port"), () =>
{
    console.log(("  ⚡️[ server ]: Server is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
    console.log("  Press CTRL-C to stop\n");
});

/**
 * Primary app routes.
 */
app.use("/rates", RatesController);
app.use("/currencies", CurrencyController);

module.exports = app;
