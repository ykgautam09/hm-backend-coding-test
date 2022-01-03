"use strict";

const express = require("express");
const app = express();
const port = 8010;

const logger = require("./src/logger");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

const buildSchemas = require("./src/schemas");

db.serialize(() => {
    buildSchemas(db);

    const app = require("./src/app")(db);

    app.listen(port, () => logger.verbose(`App started and listening on port ${port}`));
});