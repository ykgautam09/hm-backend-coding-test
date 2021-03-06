"use strict";


const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const logger = require("./logger");
const jsonParser = bodyParser.json();

module.exports = (db) => {
    app.get("/health", (req, res) => {
        logger.info(`${req.method} ${req.url}`);
        res.send("Healthy");
    });

    app.post("/rides", jsonParser, (req, res) => {
        // sanitize values provided
        const startLatitude = Number(req.body.start_lat);
        const startLongitude = Number(req.body.start_long);
        const endLatitude = Number(req.body.end_lat);
        const endLongitude = Number(req.body.end_long);
        const riderName = String(req.body.rider_name);
        const driverName = String(req.body.driver_name);
        const driverVehicle = String(req.body.driver_vehicle);

        logger.info(`${req.method} ${req.url}`);
        if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
            logger.error("validation error");
            return res.send({
                error_code: "VALIDATION_ERROR",
                message: "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
            });
        }

        if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
            logger.error("validation error");
            return res.send({
                error_code: "VALIDATION_ERROR",
                message: "End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
            });
        }

        if (typeof riderName !== "string" || riderName.length < 1) {
            return res.send({
                error_code: "VALIDATION_ERROR",
                message: "Rider name must be a non empty string"
            });
        }

        if (typeof driverName !== "string" || driverName.length < 1) {
            logger.error("validation error");

            return res.send({
                error_code: "VALIDATION_ERROR",
                message: "Driver name must be a non empty string"
            });
        }

        if (typeof driverVehicle !== "string" || driverVehicle.length < 1) {
            logger.error("validation error");

            return res.send({
                error_code: "VALIDATION_ERROR",
                message: "Driver Vehicle must be a non empty string"
            });
        }

        let values = [req.body.start_lat, req.body.start_long, req.body.end_lat, req.body.end_long, req.body.rider_name, req.body.driver_name, req.body.driver_vehicle];

        const result = db.run("INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)", values, function (err) {
            if (err) {
                logger.error(new Error("Unable to insert entry in database"));
                return res.send({
                    error_code: "SERVER_ERROR",
                    message: "Unknown error"
                });
            }

            db.all("SELECT * FROM Rides WHERE rideID = ?", this.lastID, function (err, rows) {
                if (err) {
                    logger.error(new Error("Unable to Read Riders data from database"));
                    return res.send({
                        error_code: "SERVER_ERROR",
                        message: "Unknown error"
                    });
                }

                res.send(rows);
            });
        });
    });

    app.get("/rides", (req, res) => {
        logger.info(`${req.method} ${req.url}`);

        // sanitize query parameters
        let size = parseInt(req.query.size) || 10;  // no of records returned
        let page = parseInt(req.query.page) || 1;  // page id when records created using size
        let startID = size * (page - 1);
        if (size < 0 || page < 0) {
            logger.info(`size : ${size} or page : ${page} values are not valid`);
            return res.send({
                error_code: "INVALID_SIZE",
                message: `size or page values are not valid`
            });
        }

        db.all(`SELECT * FROM Rides WHERE rideID>${startID} LIMIT ${size};`, function (err, rows) {
            if (err) {
                logger.error(new Error("Unable to Read Riders data from database"));
                return res.send({
                    error_code: "SERVER_ERROR",
                    message: "Unknown error"
                });
            }

            if (rows.length === 0) {
                logger.warn("Data does not exists");

                return res.send({
                    error_code: "RIDES_NOT_FOUND_ERROR",
                    message: "Could not find any rides"
                });
            }

            res.send(rows);
        });
    });

    app.get("/rides/:id", (req, res) => {
        logger.info(`${req.method} ${req.url}`);

        // sanitize id params
        db.all(`SELECT * FROM Rides WHERE rideID='${req.params.id}'`, function (err, rows) {
            if (err) {
                logger.error(new Error("Unable to Read Riders data from database"));

                return res.send({
                    error_code: "SERVER_ERROR",
                    message: "Unknown error"
                });
            }

            if (rows.length === 0) {
                logger.warn("Data does not exists");
                return res.send({
                    error_code: "RIDES_NOT_FOUND_ERROR",
                    message: "Could not find any rides"
                });
            }

            res.send(rows);
        });
    });

    return app;
};
