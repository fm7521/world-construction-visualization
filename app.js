/**
 * Simple server to host assets and code
 */

"use strict";

const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "./assets")));
app.use(express.static(path.join(__dirname, "./dist")));

app.get("/test", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./test_library.html"));
});

app.listen(8000, "0.0.0.0", () => {
    console.log("Server listening on port 8000");
});
