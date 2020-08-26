const express = require('express')
const { generateGif, convertImgToBase64 } = require('./modules/countdown-gif')
const app = express()
const port = process.env.PORT || 4000;
// Static image allow
app.use(express.static('data'))

app.get('/', (req, res) => {
    generateGif()
    res.sendFile(__dirname + '/views/index.html');
})

app.get('/countdown', function (req, res) {
    var img = convertImgToBase64();
    console.log(img)
    res.writeHead(200, {
        'Content-Type': 'image/gif',
        'Content-Length': img.length,
        'cache-control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
    });
    res.end('data:image/gif;base64,' + img);
});

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});
