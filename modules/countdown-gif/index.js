const GIFEncoder = require('gifencoder');
const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration')
dayjs.extend(duration)

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');
// app root path
const appDir = path.dirname(require.main.filename);

module.exports = {
    generateGif: (width = 300, height = 100) => {
        const currentDateTime = dayjs();
        const endDateTime = dayjs('2020-08-26T02:59:59.000Z');
        const dateDiff = endDateTime.diff(currentDateTime, 'minute')
        const encoder = new GIFEncoder(width, height);
        // stream the results as they are available into myanimated.gif
        encoder.createReadStream().pipe(fs.createWriteStream(appDir + '/data/myanimated.gif'));

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

        for (let i = 20; i >= 0; i--) {
            // paint BG
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, width, height);
            // paint text
            ctx.fillStyle = '#000';
            ctx.fillText(`${i} s`, 150, 50);
            encoder.addFrame(ctx);
        }

        encoder.finish();
    }
}
