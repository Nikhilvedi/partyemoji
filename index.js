const Jimp = require('jimp');

Jimp.read('mexicanben.png')
    .then(picture => {
        return picture
            .colour([
                { apply: 'mix', params: ['#f0D', 37] }
                ])
            .write('output.jpg'); // save
    })
    .then(picture => {
        return picture
            .colour([
                { apply: 'mix', params: ['#f01', 37] }
            ])
            .write('output2.jpg'); // save
    })
    .catch(err => {
        console.error(err);
    });
