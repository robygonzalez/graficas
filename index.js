const express = require('express')
const app = express()

app.use(express.static('/static', './static/'))

// app.listen(3000, () => console.log('server is listening on port 3000!'))