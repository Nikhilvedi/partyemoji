'use strict';

const fs = require('fs');
const path = require('path');
const multer = require("multer");

const processImage = require('./imageManipulation/processImage');

const express = require('express');
const app = express();


app.get("/", express.static(path.join(__dirname, "./public")));

app.listen(process.env.PORT || 3000, function () {
    console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})

const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
    console.log(err);
};

const upload = multer({
    dest: "/uploaded/files"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});


app.post(
    "/upload", upload.single("file"), (req, res) => {

        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "./uploaded/files/image.png");

        if (path.extname(req.file.originalname).toLowerCase() === ".png" || ".jpg") {
            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);
            });
        } else {
            fs.unlink(tempPath, err => {
                if (err) return handleError(err, res);

                res
                    .status(403)
                    .contentType("text/plain")
                    .end("Only .png/.jpg files are allowed!");
            });
        }
        processImage.processImage().then(() => {
            res.download(__dirname + '/myanimated.gif');
        }).catch((err) => {
            console.log(err);
        });
    })






