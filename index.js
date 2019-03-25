const Jimp = require('jimp');
var GIFEncoder = require('gifencoder');
var encoder = new GIFEncoder(100, 100);
var pngFileStream = require('png-file-stream');
var fs = require('fs');

Jimp.read('mexicanben.png')
    .then(picture => {
        return picture
            .resize(100,100)
            .colour([
                { apply: 'mix', params: ['#f0D', 37] }
                ])
            .write('images/output.png'); // save
    })
    .then(picture => {
        return picture
            .resize(100,100)
            .colour([
                { apply: 'mix', params: ['#000aff', 37] }
            ])
            .write('images/output2.png'); // save
    })
    .then(picture => {
        return picture
            .resize(100,100)
            .colour([
                { apply: 'mix', params: ['#e2ff00', 30] }
            ])
            .write('images/output3.png'); // save
    })
    .then(picture => {
        return picture
            .resize(100,100)
            .colour([
                { apply: 'mix', params: ['#01ff08', 30] }
            ])
            .write('images/output4.png'); // save
    })
    .then(() => {
    console.log('done');

        pngFileStream('images/*.png')
            .pipe(encoder.createWriteStream({ repeat: 0, delay: 100, quality: 100 }))
            .pipe(fs.createWriteStream('myanimated.gif'));

})
    .catch(err => {
        console.error(err);
    });
