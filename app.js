const express = require('express')
const app = express()
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    // res.send(JSON.stringify({ Hello: 'World' }))
    res.sendfile(__dirname + "/views/index.html");
})

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});
