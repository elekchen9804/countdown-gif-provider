const express = require('express')
const { generateGif } = require('./modules/countdown-gif')
const app = express()
const port = process.env.PORT || 4000;
// Static image allow
app.use(express.static('data'))

app.get('/', (req, res) => {
    generateGif()
    res.sendfile(__dirname + '/views/index.html');
})

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});
