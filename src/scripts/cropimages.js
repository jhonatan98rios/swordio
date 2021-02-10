const sharp = require('sharp');

let array = 'abcdefghijklmno'.split('')

array.forEach( img => {
    let originalImage = `images/${img}.png`;
    let outputImage = `output/${img}.png`;

    sharp(originalImage)
        .extract({ width: 1000, height: 1100, left: 50, top: 0 }) // 1100 x 1100
        .resize(500, 550)    
        .toFile(outputImage)
        .then(function(new_file_info) {
            console.log("Image cropped and saved", new_file_info);
        })
        .catch(function(err) {
            console.log("An error occured", err);
        });

})

