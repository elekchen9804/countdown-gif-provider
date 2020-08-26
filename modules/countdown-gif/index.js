const GIFEncoder = require('gifencoder');
const prettyMs = require('pretty-ms');
const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');
// app root path
const appDir = path.dirname(require.main.filename);
const imagePath = appDir + '/data/myanimated.gif';

module.exports = {
    generateGif: (width = 300, height = 100) => {
        const currentDateTime = dayjs();
        const endDateTime = dayjs('2020-12-31T23:59:59.000Z');
        let dateDiff = endDateTime.diff(currentDateTime, 'ms');
        const encoder = new GIFEncoder(width, height);
        // stream the results as they are available into myanimated.gif
        encoder.createReadStream().pipe(fs.createWriteStream(imagePath));

        encoder.start();
        encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
        encoder.setDelay(1000);  // frame delay in ms
        encoder.setQuality(20); // image quality. 10 is default.

        // use node-canvas
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // set the font style
        ctx.font = "30px Arial";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let i = 300; i >= 0; i--) {
            // Convert time format
            let formattedTime = prettyMs(dateDiff, { secondsDecimalDigits: 0 });

            // paint BG
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, width, height);
            // paint text
            ctx.fillStyle = '#000';
            ctx.fillText(`${formattedTime}`, 150, 50);
            encoder.addFrame(ctx);
            dateDiff = dateDiff - 1000;
        }

        encoder.finish();
    },
    convertImgToBase64: () => {
        return base64_encode(imagePath);

        function base64_encode(file) {
            // read binary data
            var bitmap = fs.readFileSync(file);
            // convert binary data to base64 encoded string
            return new Buffer.from(bitmap).toString('base64');
        }
    }
}
