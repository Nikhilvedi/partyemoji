const fs = require('fs');
const Jimp = require('jimp');
const GIFEncoder = require('gifencoder');
const pngFileStream = require('png-file-stream');
const encoder = new GIFEncoder(100, 100);

async function processImage() {
    Jimp.read('./uploaded/files/image.png')
        .then(picture => {
            return picture
                .resize(100, 100)
                .colour([
                    {apply: 'mix', params: ['#fe00f6', 30]}
                ])
                .write('images/output.png'); // save
        })
        .then(picture => {
            return picture
                .resize(100, 100)
                .colour([
                    {apply: 'mix', params: ['#011efe', 30]}
                ])
                .write('images/output.png'); // save
        })
        .then(picture => {
            return picture
                .resize(100, 100)
                .colour([
                    {apply: 'mix', params: ['#fdfe02', 30]}
                ])
                .write('images/output2.png'); // save
        })
        .then(picture => {
            return picture
                .resize(100, 100)
                .colour([
                    {apply: 'mix', params: ['#fe0000', 30]}
                ])
                .write('images/output3.png'); // save
        })
        .then(picture => {
            return picture
                .resize(100, 100)
                .colour([
                    {apply: 'mix', params: ['#39ff14', 30]}
                ])
                .write('images/output4.png'); // save
        })
        .then(() => {
            console.log('done');
            pngFileStream('images/*.png')
                .pipe(encoder.createWriteStream({repeat: 0, delay: 100, quality: 100}))
                .pipe(fs.createWriteStream('myanimated.gif'));

        })
        .catch(err => {
            console.error(err);
        });

}

module.exports = {
    processImage
}
