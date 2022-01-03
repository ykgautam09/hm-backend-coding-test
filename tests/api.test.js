"use strict";

const request = require("supertest");

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

const app = require("../src/app")(db);
const buildSchemas = require("../src/schemas");

describe("API tests", () => {
    before((done) => {
        db.serialize((err) => {
            if (err) {
                return done(err);
            }

            buildSchemas(db);

            done();
        });
    });

    describe("GET /health", () => {
        it("should return health", (done) => {
            request(app)
                .get("/health")
                .expect("Content-Type", /text/)
                .expect(200, done);
        });
    });


    describe("POST /rides", () => {
        it("Should return JSON data", (done) => {
            request(app)
                .post("/rides")
                .send({
                    "start_lat": 1,
                    "start_long": 2,
                    "end_lat": 3,
                    "end_long": 4,
                    "rider_name": "rider1",
                    "driver_name": "driver1",
                    "driver_vehicle": "vehicle1"
                })
                .expect("Content-Type", /json/)
                .expect(200, done);
        });

        it("should return VALIDATION_ERROR", (done) => {
            request(app)
                .post("/rides")
                .send({
                    "start_lat": 199,
                    "start_long": "2",
                    "end_lat": "3",
                    "end_long": "4",
                    "rider_name": "rider1",
                    "driver_name": "driver1",
                    "driver_vehicle": "vehicle1"
                })
                // .end()
                .expect("Content-Type", /json/)
                .expect({
                    error_code: "VALIDATION_ERROR",
                    message: "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
                }, done);
        });

        it("should return VALIDATION_ERROR", (done) => {
            request(app)
                .post("/rides")
                .send({
                    "start_lat": 1,
                    "start_long": 2,
                    "end_lat": -100,
                    "end_long": 3,
                    "rider_name": "rider1",
                    "driver_name": "driver1",
                    "driver_vehicle": "vehicle1"
                })
                // .end()
                .expect("Content-Type", /json/)
                .expect({
                    error_code: "VALIDATION_ERROR",
                    message: "End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
                }, done);
        });

        it("should return VALIDATION_ERROR", (done) => {
            request(app)
                .post("/rides")
                .send({
                    "start_lat": 1,
                    "start_long": 2,
                    "end_lat": 3,
                    "end_long": "4",
                    "rider_name": "",
                    "driver_name": "6",
                    "driver_vehicle": "7"
                })
                // .end()
                .expect("Content-Type", /json/)
                .expect({
                    error_code: "VALIDATION_ERROR",
                    message: "Rider name must be a non empty string"
                }, done);
        });

        it("should return VALIDATION_ERROR", (done) => {
            request(app)
                .post("/rides")
                .send({
                    "start_lat": 1,
                    "start_long": "2",
                    "end_lat": 0,
                    "end_long": "4",
                    "rider_name": "rider1",
                    "driver_name": "",
                    "driver_vehicle": "7"
                })
                // .end()
                .expect("Content-Type", /json/)
                .expect({
                    error_code: "VALIDATION_ERROR",
                    message: "Driver name must be a non empty string"
                }, done);
        });

        it("should return VALIDATION_ERROR", (done) => {
            request(app)
                .post("/rides")
                .send({
                    "start_lat": 1,
                    "start_long": "2",
                    "end_lat": 0,
                    "end_long": "4",
                    "rider_name": "rider1",
                    "driver_name": "Driver1",
                    "driver_vehicle": ""
                })
                // .end()
                .expect("Content-Type", /json/)
                .expect({
                    error_code: "VALIDATION_ERROR",
                    message: "Driver Vehicle must be a non empty string"
                }, done);
        });
    });


    describe("GET /rides", () => {
        it("should return ride info on page", (done) => {
            request(app)
                .get("/rides")
                .expect("Content-Type", /json/)
                .expect(200, done);
        });
    });


    describe("GET /rides/:rideValue", () => {
        it("should return single ride info", (done) => {
            request(app)
                .get("/rides/1")
                .expect("Content-Type", /json/)
                .expect(200, done);
        });
    });
    
});



